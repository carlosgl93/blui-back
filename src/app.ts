import express from "express";
const cors = require("cors");

import { connectDb } from "./db/db";
import getUsers from "./users/getUsers";
import createUser from "./users/createUser";
import getUserById from "./users/getUserById";
import { getAllComunas } from "./comunas/getAllComunas";
import { getAllServiciosAndEspecialidades } from "./servicios/getAllServiciosAndEspecialdades";
import { getPrestadores } from "./prestadores/getPrestadores";

const app = express();
app.use(cors());
app.use(express.json());

connectDb();

app.get("/users", getUsers);

app.get("/users/:id", getUserById);

app.post("/users", createUser);

app.get("/comunas", getAllComunas);

app.get("/prestadores", getPrestadores);

app.get("/servicios", getAllServiciosAndEspecialidades);   
  

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
