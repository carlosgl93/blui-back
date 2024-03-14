import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import sql from "mssql";
import { getPool } from "../../db";

export const validateDeleteEducacionFormacion = [check("id").notEmpty().withMessage("entry id is required")];

export const deleteEducacionFormacion = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send("Hubo un error al eliminar la educación");
  }

  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  const request = getPool().request();
  request.input("id", sql.Int, id);
  const query = `DELETE FROM EducacionFormacion WHERE id = @id`;

  try {
    await request.query(query);
    res.status(200).send({ message: "EducacionFormacion entry deleted successfully" });
  } catch (error) {
    console.error("Error while deleting education:", error);
    if (error instanceof Error) {
      return res
        .status(500)
        .send({ message: "An error occurred while deleting the education entry", error: error.message });
    }
    return new Error("An error occurred while deleting the education entry");
  }
};
