import { Request, Response } from "express";

export const deleteCategories = async (req: Request, res: Response) => {
  //   console.log(req.query);
  //   try {
  //     const { id } = req.params;
  //     if (!id)
  //       return res.status(404).json({ error: "Missing id. Please try again. " });

  //     const cateogry = await prisma.categories.findFirst({
  //       where: { id: Number(id) },
  //     });
  //     if (!cateogry) {
  //       return res
  //         .status(404)
  //         .json({ error: "Category not found. Please try again" });
  //     }

  //     await prisma.categories.delete({ where: { id: Number(id) } });
  //     return res.status(200).json({
  //       message: "deleted category successfully",
  //     });
  //   } catch (error) {
  //     return res.status(500).json({ error: error });
  //   }
  return res.send({ message: "hello" });
};
