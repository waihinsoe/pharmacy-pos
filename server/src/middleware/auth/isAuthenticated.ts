import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import { prisma } from "../../utils/db";
import { config } from "../../config";
const { accessTokenSecret } = config;

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.get("Authorization");
    //check header
    const accessToken = authToken?.split("Bearer ")[1];
    // console.log(accessToken);
    if (!accessToken) {
      return res.status(401).json({ message: "accessToken Unauthorized" });
    }

    const { signedCookies = {} } = req;

    const { refreshToken } = signedCookies;
    // console.log("refreshToken :", refreshToken);
    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "refreshToken Unauthorized hehe" });
    }

    const refreshTokenInDB = await prisma.tokens.findFirst({
      where: { refresh_token: refreshToken },
    });
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
