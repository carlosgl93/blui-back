import { Request, Response } from "express";
import { getPool } from "../db";

export const verifyUser = async (req: Request, res: Response) => {
  const { token } = req.body;

  console.log("verifying user");
  console.log(token);

  const result = await getPool().request().query(`SELECT * FROM EmailVerificationTokens WHERE token = '${token}'`);

  if (!result.recordset[0]) {
    return res.status(400).send({
      status: "error",
      message: "Token invalida o expirada."
    });
  }

  const { recordset } = await getPool().request().query(`
  UPDATE Usuario 
  SET verified = 1 
  OUTPUT inserted.*
  WHERE email = '${result.recordset[0].email}'
`);

  const updatedUser = recordset[0];

  await getPool().request().query(`DELETE FROM EmailVerificationTokens WHERE token = '${token}'`);

  res.send({
    status: "success",
    message: "Email verificado con exito.",
    user: updatedUser
  });
};
