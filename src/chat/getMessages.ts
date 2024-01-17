import { Request, Response } from "express";
import sql from "mssql";
import { getPool } from "../db";

export const getMessages = async (req: Request, res: Response) => {
  const { userId, prestadorId } = req.query;

  const request = getPool().request();
  request.input("userId", sql.Int, userId);
  request.input("prestadorId", sql.Int, prestadorId);

  console.log(userId, prestadorId);

  try {
    const messagesQuery = await request.query(
      `SELECT * FROM Mensajes WHERE usuario_id = @userId AND prestador_id = @prestadorId`
    );
    const messages = messagesQuery.recordset;

    return res.status(200).send(messages);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(500).send({ message: error.message });
    }
    return res.status(500).send({ message: "Error al obtener los mensajes." });
  }
};
