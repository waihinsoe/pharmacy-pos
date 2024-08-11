import { NextFunction, Request, Response } from "express";
import { prisma } from "../../utils/db";
import bcrypt from "bcrypt";
import { config } from "../../config";
import { clearTokens, generateJWT } from "../../utils/authFunctions";
import jwt from "jsonwebtoken";
import ms from "ms";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const isValid = email && password;
  try {
    if (!isValid) {
      return res.status(422).json({
        error: "Please fill all the required fields",
      });
    }

    const user = await prisma.users.findFirst({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ error: "User doesn't exist with your email" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Wrong password! Please try again" });
    }
    //@ts-ignore
    req.userId = user.id;
    return next();
  } catch (error) {
    console.log(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, contact_number } = req.body;

  const isValid = name && email && password && contact_number;

  if (!isValid) {
    return res
      .status(422)
      .json({ error: "Please fill all the required fields" });
  }

  try {
    const userAlreadyExists = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      return res.status(422).json({ error: "email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 15); // fix salt

    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        contact_number,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      return res
        .status(400)
        .json({ error: "Creating user process failed. Please try again" });
    }
    //@ts-ignore
    req.userId = newUser.id;
    return next();
  } catch (error) {
    return next(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  await clearTokens(req, res);
  return res.sendStatus(204);
};

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
