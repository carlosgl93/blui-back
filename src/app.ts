import express from "express";
// app.ts
// import { getUsers, getUserById, createUser } from "./src/users/index.js";

import { connectDb, getPool } from "./db/db";
import getUsers from "./users/getUsers";
import createUser from "./users/createUser";
import getUserById from "./users/getUserById";

const app = express();
app.use(express.json());

connectDb();

app.get("/users", getUsers);

app.get("/users/:id", getUserById);

app.post("/users", createUser);

app.get("/comunas", (req, res) => {
  getPool().request().query`SELECT * FROM Comunas`
    .then(result => {
      res.json(result.recordset);
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
