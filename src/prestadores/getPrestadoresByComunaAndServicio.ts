import { Request, Response } from "express";
import { getPool } from "../db/db";

export const getPrestadoresByComunaAndServicio = () => async (req: Request, res: Response) => {
  console.log(req.query);
  console.log(req.params);
  console.log(req);

  const comunas = req.query.comunas;
  const servicio = req.query.servicio;

  try {
    const data = await getPool().request().query`
      SELECT * FROM Prestadores
      WHERE Comuna IN (${comunas})
      AND Servicio = ${servicio}
    `;
    res.send({
      status: "success",
      data: data.recordset,
      message: "Fetched prestadores successfully",
      statusCode: 200
    });
  } catch (error) {
    res.send({
      status: "error",
      message: "There was an error fetching prestadores.",
      statusCode: 500
    });
  }
};
