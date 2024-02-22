import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "./db";
import { config } from "../config";

const { nodeEnv } = config;
const dev = nodeEnv === "development";

export const generateJWT = (
  userId: number,
  secret: string,
  expirationTime: string
) => {
  return jwt.sign(
    {
      userId,
    },
    secret,
    { expiresIn: expirationTime }
  );
};

export const clearTokens = async (req: Request, res: Response) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  if (refreshToken) {
    await prisma.tokens.deleteMany({
      where: {
        refresh_token: refreshToken,
      },
    });
  }
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: !dev,
    signed: true,
  });
};
