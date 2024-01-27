import express from "express";
import { getDisponibilidad, postDisponibilidad } from "../controllers/disponibilidadController";

const disponibilidadRouter = express.Router();

disponibilidadRouter.get("/:id", getDisponibilidad);
disponibilidadRouter.post("/", postDisponibilidad);

export default disponibilidadRouter;
