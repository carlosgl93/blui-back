import express from "express";
import dotenv from "dotenv";
const cors = require("cors");

import { connectDb } from "./db/db";
import getUsers from "./users/getUsers";
import { createUser, loginUser } from "./users";
import getUserById from "./users/getUserById";
import { getAllComunas } from "./comunas/getAllComunas";
import { getAllServiciosAndEspecialidades } from "./servicios/getAllServiciosAndEspecialdades";
import { getPrestadores } from "./prestadores/getPrestadores";
import { getPrestadorById } from "./prestadores/getPrestadorById";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

connectDb();

app.get("/users", getUsers);
app.post("/users", createUser);
app.post("/users/login", loginUser);

app.get("/users/:id", getUserById);

app.get("/comunas", getAllComunas);

app.get("/prestadores", getPrestadores);
app.get("/prestadores/:id", getPrestadorById);

app.get("/servicios", getAllServiciosAndEspecialidades);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
