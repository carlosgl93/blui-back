import { Request, Response } from "express";
import sql from "mssql";

import { body, validationResult } from "express-validator";

import { getPool } from "../../db";

export const validateEducacionFormacion = [
  body("*.prestadorId").notEmpty().withMessage("prestadorId is required"),
  body("*.institucion").isLength({ min: 1 }).withMessage("institucion is required"),
  body("*.inicio").isLength({ min: 1 }).withMessage("inicio is required"),
  body("*.final").isLength({ min: 1 }).withMessage("final is required"),
  body("*.titulo").isLength({ min: 1 }).withMessage("titulo is required")
];

export const postEducacion = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send("Faltan campos requeridos");
  }

  const educacionFormacion = req.body;
  console.log(educacionFormacion);

  try {
    for (const educacion of educacionFormacion) {
      const { id, prestadorId, institucion, inicio, final, titulo } = educacion;

      if (!prestadorId || !institucion || !inicio || !final || !titulo) {
        throw new Error("Error al insertar educaicon, faltan campos");
      }

      const request = getPool().request();

      await request
        .input("id", sql.Int, id || null)
        .input("prestadorId", sql.Int, prestadorId)
        .input("institucion", sql.NVarChar, institucion)
        .input("inicio", sql.Date, inicio)
        .input("final", sql.Date, final)
        .input("titulo", sql.NVarChar, titulo).query(`
        MERGE INTO EducacionFormacion AS Target 
        USING (SELECT @id, @prestadorId, @institucion, @inicio, @final, @titulo) AS Source 
        (id, prestadorId, institucion, inicio, final, titulo) 
        ON Target.id = Source.id 
        WHEN MATCHED THEN 
          UPDATE SET 
            prestadorId = Source.prestadorId, 
            institucion = Source.institucion, 
            inicio = Source.inicio, 
            final = Source.final, 
            titulo = Source.titulo 
        WHEN NOT MATCHED THEN 
          INSERT (prestadorId, institucion, inicio, final, titulo) 
          VALUES (Source.prestadorId, Source.institucion, Source.inicio, Source.final, Source.titulo);
      `);
    }

    res.status(200).send("Educacion saved correctly");
  } catch (error) {
    console.error("Error while saving education:", error);
    if (error instanceof Error) return res.status(500).send(error.message);

    return res.status(500).send("Ha ocurrido un error al guardar la educacion");
  }
};
