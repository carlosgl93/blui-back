import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import sql from "mssql";
import { getPool } from "../../db";

export const validatePrestadorCuentaBancaria = [
  check("prestadorId").notEmpty().withMessage("prestadorId is required"),
  check("banco").notEmpty().withMessage("banco is required"),
  check("tipoCuenta").notEmpty().withMessage("tipoCuenta is required"),
  check("numeroCuenta").notEmpty().withMessage("numeroCuenta is required"),
  check("rutTitular").notEmpty().withMessage("rutTitular is required"),
  check("nombreTitular").notEmpty().withMessage("nombreTitular is required")
];

export const postPrestadorCuentaBancaria = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const request = getPool().request();

  const { prestadorId, banco, tipoCuenta, numeroCuenta, rut, titular } = req.body;
  request.input("prestadorId", sql.Int, prestadorId);
  request.input("banco", sql.NVarChar, banco);
  request.input("tipoCuenta", sql.NVarChar, tipoCuenta);
  request.input("numeroCuenta", sql.NVarChar, numeroCuenta);
  request.input("rutTitular", sql.NVarChar, rut);
  request.input("nombreTitular", sql.NVarChar, titular);

  const query = `INSERT INTO CuentaBancaria (prestadorId, banco, tipoCuenta, numeroCuenta, rut, titular) VALUES (@prestadorId, @banco, @tipoCuenta, @numeroCuenta, @rutTitular, @nombreTitular)`;

  try {
    const result = await request.query(query);
    console.log(result);
    res.status(200).send("Cuenta bancaria insertada correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al intentar insertar cuenta bancaria");
  }
};
