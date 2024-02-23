import { NextFunction, Request, Response } from "express";
import { prisma } from "../utils/db";
import { generateJWT } from "../utils/authFunctions";
import { config } from "../config";
import ms from "ms";
import jwt from "jsonwebtoken";
const {
  refreshTokenLife,
  refreshTokenSecret,
  accessTokenLife,
  accessTokenSecret,
  nodeEnv,
} = config;

const dev = nodeEnv === "development";

export const generateAuthTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    const userId: number = req.userId;
    const user = await prisma.users.findFirst({
      where: {
        id: userId,
      },
    });

    const refreshToken = generateJWT(
      userId,
      refreshTokenSecret,
      refreshTokenLife
    );

    const accessToken = generateJWT(userId, accessTokenSecret, accessTokenLife);

    const token = {
      refresh_token: refreshToken,
      user_id: userId,
      expiration_time: new Date(Date.now() + ms(refreshTokenLife)).getTime(),
    };

    await prisma.tokens.create({
      data: token,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !dev,
      signed: true,
      expires: new Date(Date.now() + ms(refreshTokenLife)),
    });

    const expiresAt = new Date(Date.now() + ms(accessTokenLife));

    return res.status(200).json({
      user,
      token: accessToken,
      expiresAt,
    });
  } catch (error) {
    return next(error);
  }
};

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.get("Authorization");
    const accessToken = authToken?.split("Bearer ")[1];
    if (!accessToken) {
      return res.status(401).json({ message: "accessToken Unauthorized" });
    }

    const { signedCookies = {} } = req;

    const { refreshToken } = signedCookies;
    if (!refreshToken) {
      return res.status(401).json({ message: "refreshToken Unauthorized" });
    }

    const refreshTokenInDB = await prisma.tokens.findFirst({
      where: { refresh_token: refreshToken },
    });
    console.log(refreshTokenInDB);
    if (!refreshTokenInDB) {
      return res.status(401).json({ message: "refreshTokenInDB Unauthorized" });
    }

    let decodedToken: any;
    try {
      decodedToken = jwt.verify(accessToken, accessTokenSecret);
    } catch (err) {
      return res.status(401).json({ message: "decodedToken Unauthorized" });
    }
    const { userId } = decodedToken;
    const user = await prisma.users.findFirst({ where: { id: userId } });
    if (!user) {
      return res.status(401).json({ message: "user Unauthorized" });
    }

    //@ts-ignore
    req.userId = user.id;
    return next();
  } catch (error) {
    return next(error);
  }
};
