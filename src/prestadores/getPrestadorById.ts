import { Request, Response } from "express";
import { getPool } from "../db/db";

export const getPrestadorById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    console.log("fetching prestador by id", id);

    const data = await getPool().request().query`
      SELECT P.id, P.firstname, P.lastname, P.service_id, P.speciality_id, P.imgUrl, P.description, AVG(R.score) as average_review, COUNT(R.score) as total_reviews,
      (SELECT STRING_AGG(comuna_id, ',') FROM Prestador_Comuna WHERE prestador_id = P.id) as comunas
      FROM Prestador P
      LEFT JOIN Reviews R ON P.id = R.prestador_id
      WHERE P.id = ${id}
      GROUP BY P.id, P.firstname, P.lastname, P.service_id, P.speciality_id, P.imgUrl, P.description;
      `;
    return res.status(200).send(data.recordset[0]);
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "There was an error fetching prestador by id.",
      statusCode: 500
    });
  }
};
