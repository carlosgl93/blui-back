import express from "express";
import { get, post, deleteEntry } from "../controllers/historialLaboralController";

const historialLaboralRouter = express.Router();

// Controllers
historialLaboralRouter.get("/", get);

historialLaboralRouter.post("/", post);
historialLaboralRouter.delete("/:id", deleteEntry);

export default historialLaboralRouter;
