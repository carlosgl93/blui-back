import { Request, Response } from "express";
import sql from "mssql";
import { getPool } from "../db";

export const getUsuarioInboxMessages = async (req: Request, res: Response) => {
  const request = getPool().request();
  const userId = req.query.userId;
  request.input("userId", sql.Int, userId);

  try {
    const usuarioChats = await request.query(`
        SELECT t.id, t.usuario_id, t.prestador_id, t.message, t.created_at, t.sent_by, p.firstname, p.lastname
      FROM (
          SELECT *,
          ROW_NUMBER() OVER(PARTITION BY prestador_id ORDER BY created_at DESC) as rn
          FROM Mensajes
          WHERE usuario_id = @userId
      ) t
      JOIN Prestador p ON t.prestador_id = p.id
      WHERE rn = 1;
    `);
    res.status(200).send(usuarioChats.recordset);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).send(new Error(error.message));
    }
  }
};
