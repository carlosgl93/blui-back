import { Request, Response } from "express";
import sql from "mssql";
import { getPool } from "../db";

export const postDisponibilidad = async (req: Request, res: Response) => {
  const { prestadorId, day, startTime, endTime } = req.body;

  const request = getPool().request();
  // add the inputs to the request object
  request.input("prestadorId", sql.Int, prestadorId);
  request.input("day", sql.VarChar, day);
  request.input("startTime", sql.VarChar, startTime);
  request.input("endTime", sql.VarChar, endTime);

  // Insert into AvailabilityDays
  const queryDays = `
    IF NOT EXISTS (SELECT * FROM AvailabilityDays WHERE prestador_id = @prestadorId)
      INSERT INTO AvailabilityDays (prestador_id, @day)
      VALUES (@prestadorId, 1)
    ELSE
      UPDATE AvailabilityDays
      SET @day = 1
      WHERE prestador_id = @prestadorId
  `;
  request.input("prestadorId", sql.Int, prestadorId);
  await request.query(queryDays);
  // Get the ID of the AvailabilityDays row
  const {
    recordset: [{ id: daysId }]
  } = await request.query("SELECT id FROM AvailabilityDays WHERE prestador_id = @prestadorId");

  // Insert into AvailabilityTimes
  const queryTimes = `
    INSERT INTO AvailabilityTimes (availability_day_id, start_time, end_time)
    VALUES (@daysId, @startTime, @endTime)
  `;

  request.input("daysId", sql.Int, daysId);
  request.input("startTime", sql.Time, startTime);
  request.input("endTime", sql.Time, endTime);
  await request.query(queryTimes);

  res.status(200).send({ message: "Availability added successfully" });
};
