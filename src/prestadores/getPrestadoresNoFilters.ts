import { Response } from "express";
import { getPool } from "../db/db";

export const getPrestadoresNoFilters = async (res: Response) => {
  try {
    console.log("inside without any filters");
    const data = await getPool().request().query`
        SELECT TOP 20 P.id, P.firstname, P.email, P.phone, P.address, P.city, P.region, P.country, P.service_id, P.speciality_id, P.lastname, P.comuna_id, AVG(R.Score) as average_review 
        FROM Prestador P
        LEFT JOIN Reviews R ON P.Id = R.prestador_id
        GROUP BY P.id, P.firstname, P.email, P.phone, P.address, P.city, P.region, P.country, P.service_id, P.speciality_id, P.lastname, P.comuna_id;
      `;

    return res.status(200).send(data.recordset);
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "There was an error fetching prestadores without any filters.",
      statusCode: 500
    });
  }
};
