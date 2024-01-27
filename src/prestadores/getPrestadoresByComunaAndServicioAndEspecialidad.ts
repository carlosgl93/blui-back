import { Response } from "express";
import { getPool } from "../db/db";

export const getPrestadoresByComunaAndServicioAndEspecialidad = async (
  res: Response,
  comuna: number,
  servicio: number,
  especialidad: number
) => {
  
  const pool = getPool();
  const request = pool.request();
  request.input("comuna_id", comuna);
  request.input("servicio_id", servicio);
  request.input("especialidad_id", especialidad);

  try {
    console.log("inside with comuna, servicio and especialidad");
    const data = await request.query`
        SELECT P.id ,P.firstname, P.lastname, P.email, P.description, P.phone, P.service_id, P.comuna_id, P.speciality_id, AVG(R.Score) as average_review, COUNT(R.id) as total_reviews 
        FROM Prestador P
        INNER JOIN Prestador_Comuna PC ON P.id = PC.prestador_id
        LEFT JOIN Reviews R ON P.id = R.prestador_id
        WHERE PC.comuna_id = @comuna_id AND P.service_id = @servicio_id AND P.speciality_id = @especialidad_id
        GROUP BY P.id, P.firstname, P.lastname, P.email, P.description, P.phone, P.service_id, P.comuna_id, P.speciality_id
      `;

    return res.status(200).send(data.recordset);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({
        status: "error",
        message: error.message,
        statusCode: 500
      });
    }
    return res.status(500).send({
      status: "error",
      message: "There was an error fetching prestadores by comuna, servicio and especialidad.",
      statusCode: 500
    });
  }
};
