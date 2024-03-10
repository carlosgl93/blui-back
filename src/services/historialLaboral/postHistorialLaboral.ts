import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import sql from "mssql";
import { getPool } from "../../db";

type SaveHistorialLaboral = {
  prestadorId: number;
  empresa: string;
  inicio: string;
  final: string;
  titulo: string;
};

export const validateHistorialLaboral = [
  check("prestadorId").notEmpty().withMessage("prestadorId is required"),
  check("empresa").notEmpty().withMessage("empresa is required"),
  check("inicio").notEmpty().withMessage("inicio is required"),
  check("final").notEmpty().withMessage("final is required"),
  check("titulo").notEmpty().withMessage("titulo is required")
];

export const postHistorialLaboral = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const promises = req.body.map(async (historial: SaveHistorialLaboral) => {
    const request = getPool().request();
    const { prestadorId, empresa, inicio, final, titulo } = historial;

    console.log(historial);

    if (!prestadorId || !empresa || !inicio || !final || !titulo) {
      throw new Error("Error al insertar historial laboral");
    }

    console.log(historial);

    request.input("prestadorId", sql.Int, prestadorId);
    request.input("empresa", sql.NVarChar, empresa);
    request.input("inicio", sql.Date, inicio);
    request.input("final", sql.Date, final);
    request.input("titulo", sql.NVarChar, titulo);

    // Insert new record
    const insertQuery = `INSERT INTO HistorialLaboral (prestadorId, empresa, inicio, final, titulo) VALUES (@prestadorId, @empresa, @inicio, @final, @titulo)`;
    return request.query(insertQuery);
  });

  Promise.all(promises)
    .then(() => {
      console.log("All promises resolved successfully");
      res.status(200).send("Historial laboral actualizado exitosamente");
    })
    .catch(error => {
      console.error(error);
      console.error("A promise rejected with the following error:", error);
      res.status(500).send("Error al insertar historial laboral");
    });
};
