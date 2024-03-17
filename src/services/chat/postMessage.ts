import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import sql from "mssql";
import nodemailer from "nodemailer";

import { getPool } from "../../db/db";
import { SECRET, EMAIL_USERNAME, EMAIL_PASSWORD, BASE_URL } from "../../utils/config";
import Mail from "nodemailer/lib/mailer";

export const postMessage = async (req: Request, res: Response) => {
  console.log("posting a new message");

  console.log(req.body);
  const { message, sentBy } = req.body;

  const userId = Number(req.body.userId);
  const prestadorId = Number(req.body.prestadorId);

  const secretKey = SECRET;

  if (!req.headers.authorization) {
    return res.status(401).send({
      status: "error",
      message: "Missing auth token.",
      statusCode: 401
    });
  }

  if (req?.headers?.authorization.length < 1) {
    return res.status(401).send({
      status: "error",
      message: "Missing JWT Token.",
      statusCode: 401
    });
  }
  const token = req?.headers?.authorization?.split(" ")[1];
  console.log(token);

  try {
    // Verify the token.
    const decoded = jwt.verify(token, secretKey as string) as JwtPayload;

    console.log("DECODED TOKEN", decoded);
    console.log("USER ID", userId);
    console.log("PRESTADOR ID", prestadorId);

    console.log("decoded.id", decoded?.id);

    if (sentBy === "prestador" && decoded.id !== prestadorId) {
      const errorResponse = {
        status: "error",
        message: "Prestador ID does not match the token.",
        statusCode: 401
      };
      return res.status(401).send(errorResponse);
    }
    if (sentBy === "user" && decoded.id !== userId) {
      const errorResponse = {
        status: "error",
        message: "Customer ID does not match the token.",
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
            SELECT firstname, email, lastname FROM Usuario WHERE id = ${userId}
        `);

    const { firstname: prestadorName, email: prestadorEmail } = prestadorQuery.recordset[0];
    console.log("prestadorName", prestadorName);
    console.log("prestadorEmail", prestadorEmail);

    const { firstname: userFirstname, lastname: userLastname, email: userEmail } = userQuery.recordset[0];
    console.log("userFirstname", userFirstname);
    console.log("userLastname", userLastname);
    console.log("userEmail", userEmail);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD
      }
    });

    let mailOptions: Mail.Options;

    if (sentBy === "prestador") {
      mailOptions = {
        from: EMAIL_USERNAME,
        to: userEmail,
        subject: `Blui: ${prestadorName} te ha enviado un mensaje`,
        text: `Hola ${userFirstname}, ${prestadorName} te ha enviado un mensaje: ${message}`,
        html:
          `<p>Hola ${userFirstname}:</p>` +
          `${prestadorName} te ha enviado un mensaje:` +
          `<br>` +
          `<p>${message}</p>` +
          `<a href="${BASE_URL}/chat?userId=${userId}&prestadorId=${prestadorId}">¡Respondele aquí!</a>`
      };
    } else {
      mailOptions = {
        from: EMAIL_USERNAME,
        to: prestadorEmail,
        subject: `Blui: ${userFirstname} te ha enviado un mensaje`,
        text: `Hola ${prestadorName}, ${userFirstname} te ha enviado un mensaje: ${message}`,
        html:
          `<p>Hola ${prestadorName}:</p>` +
          `${userFirstname} ${userLastname} te ha enviado un mensaje:` +
          `<br>` +
          `<p>${message}</p>` +
          `<a href="${BASE_URL}/prestador-chat?userId=${userId}&prestadorId=${prestadorId}">¡Respondele aquí!</a>`
      };
    }

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
      console.log("jwt error", error);
      if (error.message === "jwt must be provided") {
        return res.status(401).send({
          status: "error",
          message: "Missing JWT Token.",
          statusCode: 401
        });
      }
    } else if (error instanceof Error) {
      return res.status(500).send({
        status: "error",
        message: `There was an error sending the message. ${error.message}`,
        statusCode: 500
      });
    }
  }
};
