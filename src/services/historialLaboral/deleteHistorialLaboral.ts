import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import sql from "mssql";
import { getPool } from "../../db";

export const validateDeleteHistorialLaboral = [check("id").notEmpty().withMessage("entry id is required")];

export const deleteHistorialLaboral = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).send("Hubo un error al eliminar el historial laboral");
  }

  const request = getPool().request();
  const { id } = req.params;

  const query = `DELETE FROM HistorialLaboral WHERE id = @id`;
  request.input("id", sql.Int, id);
  try {
    const result = await request.query(query);
    console.log(result);
    res.send(200);
  } catch (error) {
    res.status(500);
  }
};
