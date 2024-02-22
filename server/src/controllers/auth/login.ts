import { NextFunction, Request, Response } from "express";
import { prisma } from "../../utils/db";
import bcrypt from "bcrypt";
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
