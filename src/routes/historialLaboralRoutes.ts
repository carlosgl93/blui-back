import express from "express";
import { get, post, deleteEntry } from "../controllers/historialLaboralController";
import { validateDeleteHistorialLaboral, validateHistorialLaboral } from "../services/historialLaboral";

const historialLaboralRouter = express.Router();

// Controllers
historialLaboralRouter.get("/", get);

historialLaboralRouter.post("/", validateHistorialLaboral, post);
historialLaboralRouter.delete("/:id", validateDeleteHistorialLaboral, deleteEntry);

export default historialLaboralRouter;
