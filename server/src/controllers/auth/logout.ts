import { Request, Response } from "express";
import { clearTokens } from "../../utils/authFunctions";

export const logout = async (req: Request, res: Response) => {
  await clearTokens(req, res);
  return res.sendStatus(204);
};
