import { NextFunction, Request, Response } from "express";
import { prisma } from "../utils/db";
import { generateJWT } from "../utils/auth";
import { config } from "../config";
import ms from "ms";
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
