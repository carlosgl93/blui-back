import { Request, Response } from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";

import { getPool } from "../../db";

export const createPrestador = async (req: Request, res: Response) => {
  const prestador = req.body;
  const email = prestador.email;
  console.log(prestador);
  const request = await getPool().request();

  for (const key in prestador) {
    if (prestador[key] !== undefined && typeof prestador[key] !== "object") {
      request.input(key, prestador[key]);
    }
  }

  let existingPrestador = await request.query(`
  SELECT * FROM Prestador
  WHERE email = @email OR rut = @rut
`);

  if (existingPrestador.recordset.length > 0) {
    return res.status(400).send({ prestador: null, message: "Un prestador con ese email o rut ya existe." });
  }

  try {
    const token = crypto.randomBytes(20).toString("hex");

    const nowToSql = new Date().toISOString();

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
        `<pi q><a href="${process.env.BASE_URL}/email-verificado-prestador?token=${token}">Verifica tu email</a></pi>` +
        "<p>Si tu no te registraste en Blui, por favor ignora este email.</p>"
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    let result = await request.query(`
      INSERT INTO Prestador
      (rut, firstname, lastname, email, phone, service_id, speciality_id)
      VALUES
      (@rut, @firstname, @lastname, @email, @phone, @service_id, @speciality_id);
      SELECT SCOPE_IDENTITY() AS id;
    `);

    let prestador_id = result.recordset[0].id;

    // Insert into Prestador_Comuna table
    for (let comuna of prestador.comunas) {
      let requestComuna = getPool().request();
      await requestComuna.input("prestador_id", prestador_id);
      await requestComuna.input("comuna_id", comuna.id);
      await requestComuna.query(`
        INSERT INTO Prestador_Comuna
        (prestador_id, comuna_id)
        VALUES
        (@prestador_id, @comuna_id)
      `);
    }

    res.status(201).send({
      prestador: prestador,
      message: "Prestador creado correctamente"
    });
  } catch (error) {
    res.status(500).send({
      message: "Error al crear prestador",
      error
    });
  }
};
