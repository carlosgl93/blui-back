import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

import { getPool } from "../db/db";
import { error, info } from "../utils/logger";

export const createUser = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password, forWhom, rut, nombrePaciente, comuna_id } = req.body;
  info(req.body);

  let nombrePacienteToStore;

  if (nombrePaciente === "" && forWhom === "Para mí") {
    nombrePacienteToStore = firstname;
  } else {
    nombrePacienteToStore = nombrePaciente;
  }
  if (!password) {
    res.status(400).json({
      status: "error",
      message: "The 'password' field is required"
    });
    return;
  }

  const checkAlreadyExistEmail = await getPool().request().query(`SELECT * FROM Usuario WHERE email = '${email}'`);
  if (checkAlreadyExistEmail.recordset[0]?.email === email) {
    info("email ya existe", checkAlreadyExistEmail.recordset[0]);
    return res.status(400).send({
      status: "error",
      message: "Este email ya esta asociado a una cuenta."
    });
  }

  const checkAlreadyExistRut = await getPool().request().query(`SELECT * FROM Usuario WHERE rut = '${rut}'`);
  if (checkAlreadyExistRut.recordset[0]?.rut === rut) {
    info("rut ya existe", checkAlreadyExistRut.recordset[0]);

    return res.status(400).send({
      status: "error",
      message: "Este rut ya esta asociado a una cuenta."
    });
  }

  const token = crypto.randomBytes(20).toString("hex");

  const nowToSql = new Date().toISOString();

  try {
    const createNewToken = await getPool()
      .request()
      .query(
        `INSERT INTO EmailVerificationTokens (email, token, created_at) VALUES ('${email}', '${token}', '${nowToSql}')`
      );

    // Send the verification email
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
      subject: "Blui: Verifica tu cuenta",
      text: "Gracias por registrarte en Blui. Por favor verifica tu email clickeando en este link:",
      html:
        "<p>Gracias por registrarte en Blui. Por favor verifica tu email clickeando en este link:</p>" +
        `<pi q><a href="${process.env.BASE_URL}/email-verificado?token=${token}">Verifica tu email</a></pi>` +
        "<p>Si tu no te registraste en Blui, por favor ignora este email.</p>"
    };

    transporter.sendMail(mailOptions, function (err, i) {
      if (err) {
        error(err);
      } else {
        info("Email sent: " + i.response);
      }
    });
  } catch (err) {
    if (err instanceof Error) {
      error(err);
      return res.status(500).json({
        status: "error",
        message: err.message,
        statusCode: 500
      });
    } else {
      error(err);
      return res.status(500).json({
        status: "error",
        message: "Unkwon error occurred.",
        statusCode: 500
      });
    }
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await getPool().request()
      .query`INSERT INTO Usuario (firstname, lastname, email, password, forWhom, nombrePaciente, rut, comuna_id, created_at) VALUES (${firstname}, ${lastname}, ${email}, ${hashedPassword}, ${forWhom}, ${nombrePacienteToStore}, ${rut}, ${comuna_id}, ${nowToSql})`;
    return res.status(201).json({
      status: "success",
      data: result.recordset,
      message: "User created successfully",
      statusCode: 201
    });
  } catch (err) {
    if (err instanceof Error) {
      error(err);
      return res.status(500).json({
        status: "error",
        message: err.message,
        statusCode: 500
      });
    } else {
      error(err);
      return res.status(500).json({
        status: "error",
        message: "Unkwon error occurred.",
        statusCode: 500
      });
    }
  }
};
