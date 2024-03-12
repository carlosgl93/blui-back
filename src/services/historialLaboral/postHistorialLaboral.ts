import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import sql from "mssql";
import { getPool } from "../../db";

type SaveHistorialLaboral = {
  id?: number;
  prestadorId: number;
  empresa: string;
  inicio: string;
  final: string;
  titulo: string;
};

export const validateHistorialLaboral = [
  body("*.prestadorId").notEmpty().withMessage("prestadorId is required"),
  body("*.empresa").isLength({ min: 1 }).withMessage("empresa is required"),
  body("*.inicio").isLength({ min: 1 }).withMessage("inicio is required"),
  body("*.final").isLength({ min: 1 }).withMessage("final is required"),
  body("*.titulo").isLength({ min: 1 }).withMessage("titulo is required")
];

export const postHistorialLaboral = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send("Faltan campos requeridos");
  }

  const promises = req.body.map(async (historial: SaveHistorialLaboral) => {
    const request = getPool().request();
    const { prestadorId, empresa, inicio, final, titulo } = historial;

    console.log(historial);

    if (!prestadorId || !empresa || !inicio || !final || !titulo) {
      throw new Error("Error al insertar historial laboral");
    }

    if (historial.id) {
      request.input("id", sql.Int, historial.id);
    }
    request.input("prestadorId", sql.Int, prestadorId);
    request.input("empresa", sql.NVarChar, empresa);
    request.input("inicio", sql.Date, inicio);
    request.input("final", sql.Date, final);
    request.input("titulo", sql.NVarChar, titulo);

    // Check if the entry already exists
    const checkQuery = `SELECT * FROM HistorialLaboral WHERE prestadorId = @prestadorId;`;
    const result = await request.query(checkQuery);

    console.log(`result of check query`, result);

    if (result.recordset.find(entry => entry.id === historial.id)) {
      // The entry already exists, update it
      const updateQuery = `UPDATE HistorialLaboral SET empresa = @empresa, inicio = @inicio, final = @final, titulo = @titulo WHERE prestadorId = @prestadorId AND id = @id`;
      return request.query(updateQuery);
    } else {
      // The entry doesn't exist, insert it
      const insertQuery = `INSERT INTO HistorialLaboral (prestadorId, empresa, inicio, final, titulo) VALUES (@prestadorId, @empresa, @inicio, @final, @titulo)`;
      return request.query(insertQuery);
    }
  });

  Promise.all(promises)
    .then(() => {
      console.log("All promises resolved successfully");
      res.status(200).send("Historial laboral actualizado exitosamente");
    })
    .catch((error: unknown) => {
      if (error instanceof Error) {
        console.error("A promise rejected with the following error:", error.message);
        res.status(500).send(error.message);
      }
      console.log(error);
    });
};
