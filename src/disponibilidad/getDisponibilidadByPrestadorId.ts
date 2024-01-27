import { Request, Response } from "express";
import { getPool } from "../db";
import { error } from "../utils/logger";

export const getDisponibilidadByPrestadorId = async (req: Request, res: Response) => {
  const prestadorId = req.params.id;
  const request = getPool().request();
  request.input("prestadorId", prestadorId);

  const query = `SELECT 
    days.id,
    days.prestador_id,
    days.day_name,
    days.is_available,
    MIN(times.start_time) AS start_time,
    MAX(times.end_time) AS end_time
  FROM 
    AvailabilityDays AS days
  LEFT JOIN 
    AvailabilityTimes AS times ON days.id = times.availability_day_id
  WHERE 
    days.prestador_id = @prestadorId
  GROUP BY
    days.id,
    days.prestador_id,
    days.day_name,
    days.is_available;
    `;

  try {
    const result = await request.query(query);

    const disponibilidad = result.recordset;
    return res.status(200).send(disponibilidad);
  } catch (err) {
    if (err instanceof Error) {
      error(err.message);
      return res.status(500).send(err.message);
    } else {
      res.status(500).send(err);
    }
  }
};
