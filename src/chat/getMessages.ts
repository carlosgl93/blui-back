import { Request, Response } from "express";
import sql from "mssql";
import { getPool } from "../db";
import { error, info } from "../utils/logger";

export const getMessages = async (req: Request, res: Response) => {
  const { userId, prestadorId } = req.query;

  const request = getPool().request();
  request.input("userId", sql.Int, userId);
  request.input("prestadorId", sql.Int, prestadorId);

  info(userId, prestadorId);

  try {
    const messagesQuery = await request.query(
      `SELECT Mensajes.*, Usuario.firstname, Usuario.lastname 
      FROM Mensajes 
      INNER JOIN Usuario ON Mensajes.usuario_id = Usuario.id 
      WHERE Mensajes.usuario_id = @userId AND Mensajes.prestador_id = @prestadorId`
    );
    const messages = messagesQuery.recordset;

    return res.status(200).send(messages);
  } catch (err) {
    if (err instanceof Error) {
      error(err);
      return res.status(500).send({ message: err.message });
    }
    return res.status(500).send({ message: "Error al obtener los mensajes." });
  }
};
