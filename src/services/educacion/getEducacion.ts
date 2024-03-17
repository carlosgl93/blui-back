import { Request, Response } from "express";
import { getPool } from "../../db";

export const getEducacion = async (req: Request, res: Response) => {
  console.log(req.query);
  const { prestadorId } = req.query;

  if (!prestadorId || isNaN(Number(prestadorId))) {
    console.log("Invalid prestadorId:", prestadorId);
    return res.status(400).send("Trata iniciando sesion nuevamente");
  }
  const request = getPool().request();

  try {
    const result = await request
      .input("prestadorId", prestadorId)
      .query(`SELECT * FROM EducacionFormacion WHERE prestadorId = @prestadorId`);
    console.log("Query result:", result.recordset);
    return res.status(200).send(result.recordset);
  } catch (error) {
    console.error("Error while getting education:", error);
    if (error instanceof Error) return res.status(500).send(error.message);

    return res.status(500).send("Ha ocurrido un error al obtener la educacion");
  }
};
