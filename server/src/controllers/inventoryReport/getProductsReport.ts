import { Request, Response } from "express";

export const getProductsReport = (req: Request, res: Response) => {
  return res.send({ message: "This is products report route" });
};
