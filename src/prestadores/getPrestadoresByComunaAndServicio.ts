import { Response } from "express";
import { getPool } from "../db/db";

export const getPrestadoresByComunaAndServicio = async (res: Response, comuna: number, servicio: number) => {
  console.log("inside with comuna and servicio");
  try {
    const data = await getPool().request().query`
      SELECT id, firstname, lastname, email, phone, service_id, comuna_id, speciality_id 
      FROM Prestador P
      WHERE service_id = ${servicio} AND comuna_id = ${comuna}`;
    console.log(data);
    return res.status(200).send(data.recordset);
  } catch (error) {
    return res.send({
      status: "error",
      message: "There was an error fetching prestadores with comuna and servicio.",
      statusCode: 500
    });
  }
};
