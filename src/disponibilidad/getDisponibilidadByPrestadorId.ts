import { Request, Response } from "express";
import { getPool } from "../db";

export const getDisponibilidadByPrestadorId = async (req: Request, res: Response) => {
  const prestadorId = req.params.id;
  const request = getPool().request();
  request.input("prestadorId", prestadorId);

  const query = `SELECT 
    days.id,
    days.prestador_id,
    days.monday,
    days.tuesday,
    days.wednesday,
    days.thursday,
    days.friday,
    days.saturday,
    days.sunday,
    times.start_time,
    times.end_time
FROM 
    AvailabilityDays AS days
LEFT JOIN 
    AvailabilityTimes AS times ON days.id = times.availability_day_id
WHERE 
    days.prestador_id = @prestadorId;`;

  try {
    const result = await request.query(query);

    const disponibilidad = result.recordset;
    console.log(disponibilidad);
    return res.status(200).send(disponibilidad);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).send(error.message);
    } else {
      res.status(500).send(error);
    }
  }
};
