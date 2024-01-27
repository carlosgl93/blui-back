import { Request, Response } from "express";
import sql from "mssql";
import { getPool } from "../db";
import { error } from "../utils/logger";

export const getPrestadorInboxMessages = async (req: Request, res: Response) => {
  const request = getPool().request();
  const prestadorId = req.query.prestadorId;
  request.input("prestadorId", sql.Int, prestadorId);

  try {
    const prestadorChats = await request.query(`
        SELECT t.id, t.usuario_id, t.prestador_id, t.message, t.created_at, t.sent_by, u.firstname
        FROM (
            SELECT *,
            ROW_NUMBER() OVER(PARTITION BY prestador_id, usuario_id ORDER BY created_at DESC) as rn
            FROM Mensajes
        ) t
        JOIN Usuario u ON t.usuario_id = u.id
        WHERE rn = 1;
    `);
    res.status(200).send(prestadorChats.recordset);
  } catch (err) {
    error(err);
    if (err instanceof Error) {
      res.status(500).send(new Error(err.message));
    }
  }
};
