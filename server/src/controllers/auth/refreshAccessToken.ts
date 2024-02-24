import { NextFunction, Request, Response } from "express";
import { config } from "../../config";
import { prisma } from "../../utils/db";
import { clearTokens, generateJWT } from "../../utils/authFunctions";
import jwt from "jsonwebtoken";
import ms from "ms";
export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshTokenSecret, accessTokenSecret, accessTokenLife } = config;
  const { signedCookies } = req;
  const { refreshToken } = signedCookies;

  if (!refreshToken) {
    return res.sendStatus(204);
  }

  try {
    const refreshTokenInDB = await prisma.tokens.findFirst({
      where: { refresh_token: refreshToken },
    });

    if (!refreshTokenInDB) {
      await clearTokens(req, res);
      return res.status(401).json({ message: "refreshTokenInDB Unauthorized" });
    }

    try {
      const decodedToken: any = jwt.verify(refreshToken, refreshTokenSecret);
      const { userId } = decodedToken;
      const user = await prisma.users.findFirst({
        where: { id: Number(userId) },
      });

      if (!user) {
        await clearTokens(req, res);
        return res.status(401).json({ message: "invalid credentials" });
      }

      const accessToken = generateJWT(
        user.id,
        accessTokenSecret,
        accessTokenLife
      );

      return res.status(200).json({
        user,
        accessToken,
        expiresAt: new Date(Date.now() + ms(accessTokenLife)),
      });
    } catch (err) {
      return next(err);
    }
  } catch (error) {}
};
