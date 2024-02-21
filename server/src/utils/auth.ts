import jwt from "jsonwebtoken";

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
