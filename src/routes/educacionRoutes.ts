import express from "express";
import { deleteEntry, get, post } from "../controllers/educacionController";
import { validateDeleteEducacionFormacion, validateEducacionFormacion } from "../services/educacion";

const educacionRouter = express.Router();

// Controllers
educacionRouter.get("/", get);

educacionRouter.post("/", validateEducacionFormacion, post);

educacionRouter.delete("/:id", validateDeleteEducacionFormacion, deleteEntry);

export default educacionRouter;
