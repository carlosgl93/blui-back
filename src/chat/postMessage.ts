import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { getPool } from "../db/db";
import sql from "mssql";
import nodemailer from "nodemailer";

export const postMessage = async (req: Request, res: Response) => {
  console.log("posting a new message");

  console.log(req.body);
  const { userId, prestadorId, message, sentBy } = req.body;
  console.log("sentBy", sentBy);

  const secretKey = process.env.SECRET;

  if (!req.headers.authorization) {
    return res.status(401).send({
      status: "error",
      message: "You are not authorized to post a message.",
      statusCode: 401
    });
  }

  const token = req?.headers?.authorization?.split(" ")[1];

  try {
    // Verify the token.
    const decoded = jwt.verify(token, secretKey as string);

    console.log("DECODED TOKEN", decoded);
    const decodedHasId = typeof decoded === "object" && decoded !== null && decoded.id !== undefined;

    if (decodedHasId && decoded.id !== userId && decoded.id !== prestadorId) {
      const errorResponse = {
        status: "error",
        message: "You are not authorized to post a message.",
        statusCode: 401
      };
      return res.status(401).send(errorResponse);
    }

    const createMessage = getPool().request();
    createMessage.input("usuario_id", sql.Int, userId);
    createMessage.input("prestador_id", sql.Int, prestadorId);
    createMessage.input("message", sql.NVarChar, message);
    createMessage.input("sent_by", sql.NVarChar, sentBy);
    createMessage.input("created_at", sql.NVarChar, new Date().toISOString());

    const storeMessage = await createMessage.query`
            INSERT INTO Mensajes (usuario_id, prestador_id, message, created_at, sent_by) VALUES (@usuario_id, @prestador_id, @message, @created_at, @sent_by)
        `;

    const prestadorQuery = await getPool().request().query(`
            SELECT id, firstname, email FROM Prestador WHERE id = ${prestadorId}
        `);

    const userQuery = await getPool().request().query(`
            SELECT firstname, email FROM Usuario WHERE id = ${userId}
        `);

    const { firstname: prestadorName, email } = prestadorQuery.recordset[0];

    const { firstname: userFirstname } = userQuery.recordset[0];

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    let mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: `Blui: ${userFirstname} te ha enviado un mensaje`,
      text: `Hola ${prestadorName}, ${userFirstname} te ha enviado un mensaje: ${message}`,
      html:
        `<p>Hola ${prestadorName}:</p>` +
        `<br>` +
        `<p>${message}</p>` +
        `<a href="${process.env.BASE_URL}/chat?userId=${userId}&prestadorId=${prestadorId}">¡Respondele aquí!</a>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    const messagesQuery = getPool().request();
    messagesQuery.input("prestador_id", sql.Int, prestadorId);
    messagesQuery.input("usuario_id", sql.Int, userId);
    const messages = await messagesQuery.query(`
            SELECT * FROM Mensajes WHERE prestador_id = @prestador_id AND usuario_id = @usuario_id
    `);

    const responseBody = {
      status: "success",
      message: "Message posted successfully.",
      messages: messages.recordset,
      statusCode: 200
    };

    return res.status(200).send(responseBody);
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({
        status: "error",
        message: "You are not authorized to post a message.",
        statusCode: 401
      });
    } else if (error instanceof Error) {
      return res.status(500).send({
        status: "error",
        message: `There was an error sending the message. ${error.message}`,
        statusCode: 500
      });
    }
  }
};
