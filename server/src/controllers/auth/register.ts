import { NextFunction, Request, Response } from "express";
import { prisma } from "../../utils/db";
import bcrypt from "bcrypt";

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

    const hashedPassword = await bcrypt.hash(password, 15);

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
