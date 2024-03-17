import { Request, Response } from "express";
import sql from "mssql";
import { getPool } from "../../db";
import { error } from "../../utils/logger";

export const postDisponibilidad = async (req: Request, res: Response) => {
  const { newDisponibilidad } = req.body;

  if (!Array.isArray(newDisponibilidad) || newDisponibilidad.length === 0) {
    res.status(400).send("No days provided");
    return;
  }

  let errors = [];
  let response = [];

  for (const disponibilidad of newDisponibilidad) {
    const request = getPool().request();

    const { prestadorId, dayName, isAvailable, startTime, endTime } = disponibilidad;

    // Validate dayName
    if (!["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].includes(dayName)) {
      errors.push(`Invalid dayName: ${dayName}`);
      continue;
    }

    // Add the inputs to the request object
    request.input("prestadorId", sql.Int, prestadorId);
    request.input("day", sql.VarChar, dayName);
    request.input("startTime", sql.NVarChar, startTime);
    request.input("endTime", sql.NVarChar, endTime);
    request.input("isAvailable", sql.Bit, isAvailable);

    const queryDays = `
  DECLARE @id INT;

  IF NOT EXISTS (SELECT * FROM AvailabilityDays WHERE prestador_id = @prestadorId AND day_name = @day)
  BEGIN
    INSERT INTO AvailabilityDays (prestador_id, day_name, is_available)
    VALUES (@prestadorId, @day, @isAvailable);

    SET @id = SCOPE_IDENTITY();

    INSERT INTO AvailabilityTimes (availability_day_id, start_time, end_time)
    VALUES (@id, @startTime, @endTime);
  END
  ELSE
  BEGIN
    UPDATE AvailabilityDays
    SET is_available = @isAvailable
    WHERE prestador_id = @prestadorId AND day_name = @day;

    SET @id = (SELECT id FROM AvailabilityDays WHERE prestador_id = @prestadorId AND day_name = @day);

    IF EXISTS (SELECT * FROM AvailabilityTimes WHERE availability_day_id = @id)
      UPDATE AvailabilityTimes
      SET start_time = @startTime, end_time = @endTime
      WHERE availability_day_id = @id;
    ELSE
      INSERT INTO AvailabilityTimes (availability_day_id, start_time, end_time)
      VALUES (@id, @startTime, @endTime);
  END
`;

    try {
      await request.query(queryDays);
    } catch (err) {
      error("Error inserting or updating AvailabilityDays and AvailabilityTimes:", err);
      errors.push(`Error inserting or updating AvailabilityDays and AvailabilityTimes: ${err}`);
      continue;
    }

    // Get the ID of the AvailabilityDays row
    let daysId;
    try {
      const {
        recordset: [{ id }]
      } = await request.query("SELECT id FROM AvailabilityDays WHERE prestador_id = @prestadorId AND day_name = @day");
      daysId = id;
    } catch (err) {
      error("Error getting ID of AvailabilityDays row:", err);
      errors.push(`Error getting ID of AvailabilityDays row: ${err}`);
      continue;
    }

    // Insert into AvailabilityTimes
    const queryTimes = `
   INSERT INTO AvailabilityTimes (availability_day_id, start_time, end_time)
   VALUES (@daysId, @startTime, @endTime)
   `;
    request.input("daysId", sql.Int, daysId);

    try {
      await request.query(queryTimes);
    } catch (err) {
      error("Error inserting into AvailabilityTimes:", err);
      errors.push(`Error inserting into AvailabilityTimes: ${err}`);
      continue;
    }

    if (errors.length > 0) {
      res.status(500).send(errors);
      return;
    }

    // Add the day and its start and end times to the response
    response.push({
      dayName,
      startTime,
      endTime,
      isAvailable
    });
  }
  res.send(response);
};
