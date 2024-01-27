// prestadorRoutes.ts
import express from "express";
import {
  getAllPrestadores,
  getPrestador,
  postVerifyPrestador,
  postPrestador,
  getPrestadorComunas
} from "../controllers/prestadorController";

const prestadoresRouter = express.Router();

prestadoresRouter.get("/", getAllPrestadores);
prestadoresRouter.get("/:id", getPrestador);
prestadoresRouter.post("/verify-email", postVerifyPrestador);
prestadoresRouter.post("/", postPrestador);
prestadoresRouter.get("/comunas", getPrestadorComunas);

export default prestadoresRouter;
