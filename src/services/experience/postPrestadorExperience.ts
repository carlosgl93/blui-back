import { getPool } from "../../db";
import { Request, Response } from "express";
import sql from "mssql";

export const postPrestadorExperience = async (req: Request, res: Response) => {
  console.log(req.body);

  const pool = getPool();
  const request = pool.request();

  const { prestadorId, experiences } = req.body;

  try {
    request.input("prestadorId", sql.Int, prestadorId);
    request.input("experiencias", sql.NVarChar(sql.MAX), JSON.stringify(experiences));

    const existingRecord = await request.query(`
        SELECT *
        FROM Experiencia
        WHERE prestadorId = @prestadorId
    `);

    if (existingRecord.recordset.length > 0) {
      // Update existing record
      await request.query(`
            UPDATE Experiencia
            SET experiencias = @experiencias
            WHERE prestadorId = @prestadorId
        `);
    } else {
      // Insert new record
      await request.query(`
            INSERT INTO Experiencia (prestadorId, experiencias)
            VALUES (@prestadorId, @experiencias)
        `);
    }

    return res.status(200).send({ message: "Experience saved" });
  } catch (error) {
    console.error("Error occurred while saving experience:", error);
    console.error("Request body:", req.body);
    if (error instanceof Error) {
      return res.status(500).send({ message: error.message });
    }
    return res.status(500).send({ message: error });
  }
};
