import { Request, Response } from "express";
import { getPool } from "../db";

export const getPrestadorExperience = async (req: Request, res: Response) => {
  const { id } = req.params;

  const request = getPool().request();

  request.input("prestadorId", id);

  const result = await request.query(`
        SELECT experiencias
        FROM Experiencia
        WHERE prestadorId = @prestadorId
    `);

  const { experiencias } = result.recordset[0];

  const response = JSON.parse(experiencias);

  res.status(200).send(response);
};
