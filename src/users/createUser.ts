import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { getPool } from "../db/db";

export const createUser = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password, forWhom, rut, nombrePaciente, comuna_id } = req.body;
  console.log(req.body);

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
    console.log("email ya existe", checkAlreadyExistEmail.recordset[0]);
    return res.status(400).send({
      status: "error",
      message: "Este email ya esta asociado a una cuenta."
    });
  }

  const checkAlreadyExistRut = await getPool().request().query(`SELECT * FROM Usuario WHERE rut = '${rut}'`);
  if (checkAlreadyExistRut.recordset[0]?.rut === rut) {
    console.log("rut ya existe", checkAlreadyExistRut.recordset[0]);

    return res.status(400).send({
      status: "error",
      message: "Este rut ya esta asociado a una cuenta."
    });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await getPool().request()
      .query`INSERT INTO Usuario (firstname, lastname, email, password, forWhom, nombrePaciente, rut, comuna_id) VALUES (${firstname}, ${lastname}, ${email}, ${hashedPassword}, ${forWhom}, ${nombrePacienteToStore}, ${rut}, ${comuna_id})`;
    return res.status(201).json({
      status: "success",
      data: result.recordset,
      message: "User created successfully",
      statusCode: 201
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: error.message,
        statusCode: 500
      });
    } else {
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: "Unkwon error occurred.",
        statusCode: 500
      });
    }
  }
};

