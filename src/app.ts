import express from "express";
const cors = require("cors");
import sql from "mssql";

import { connectDb, getPool } from "./db/db";
import getUsers from "./users/getUsers";
import createUser from "./users/createUser";
import getUserById from "./users/getUserById";
import { getPrestadoresByComunaAndServicio } from "./prestadores/getPrestadoresByComunaAndServicio";

const app = express();
app.use(cors());
app.use(express.json());

connectDb();

app.get("/users", getUsers);

app.get("/users/:id", getUserById);

app.post("/users", createUser);

app.get("/comunas", async (req, res) => {
  console.log("fetching comunas");

  try {
    const comunas = await getPool().request().query`SELECT * FROM Comuna`;
    const responseBody = {
      status: "success",
      data: comunas.recordset,
      message: "Fetched comunas successfully",
      statusCode: 200
    };

    return res.status(200).send(responseBody);
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "There was an error fetching comunas.",
      statusCode: 500
    });
  }
});

app.get("/prestadores", async (req, res) => {
  console.log(req.query);
  console.log(req.params);
  console.log(req.body);

  const service_id = Number(req.query.servicio);
  const comuna = Number(req.query.comuna);

  console.log("comuna como  int", comuna);
  console.log("servicio como int", service_id);

  if (!comuna || !service_id) {
    try {
      console.log("inside without any filters");
      const data = await getPool().request().query`
        SELECT TOP 200 * FROM Prestador;
      `;

      return res.status(200).send(data.recordset);
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "There was an error fetching prestadores.",
        statusCode: 500
      });
    }
  }

  try {
    // TODO: PASS THE PARAMETERS FROM THE FRONT TO THIS BACK QUERY: COMUNA ID AND SERVICE ID
    console.log("inside filtered query");

    const data = await getPool().request().query`
      SELECT id, firstname, lastname, email, phone, service_id, comuna_id, speciality_id 
      FROM Prestador P
      WHERE service_id = ${service_id} AND comuna_id = ${comuna}
`;
    console.log(data);
    return res.status(200).send(data.recordset);
  } catch (error) {
    return res.send({
      status: "error",
      message: "There was an error fetching prestadores.",
      statusCode: 500
    });
  }
});

app.get("/servicios", async (req, res) => {
  try {
    const data = await getPool().request().query`
      SELECT S.id as service_id, S.name as service_name, S.description as servicio_description, 
       E.id as especialidad_id, E.name as especialidad_name, E.description as especialidad_description
      FROM Servicio S
      LEFT JOIN Especialidad E ON S.id = E.servicio;
    `;

    const groupedData = data.recordset.reduce((acc, curr) => {
      if (!acc[curr.service_name]) {
        acc[curr.service_name] = {
          service_id: curr.service_id,
          service_name: curr.service_name,
          servicio_description: curr.servicio_description,
          especialidades: []
        };
      }

      acc[curr.service_name].especialidades.push({
        especialidad_id: curr.especialidad_id,
        especialidad_name: curr.especialidad_name,
        especialidad_description: curr.especialidad_description
      });

      return acc;
    }, {});

    res.send(groupedData);
  } catch (error) {
    return res.send({
      status: "error",
      message: "There was an error fetching servicios.",
      statusCode: 500
    });
  }
});
  

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
