import express from "express";
import { getAllExperiences, postPrestadorExperience } from "../controllers/experienceController";
import { getPrestadorExperience } from "../services/experience";

const experienceRouter = express.Router();

experienceRouter.get("/", getAllExperiences);
experienceRouter.post("/", postPrestadorExperience);
experienceRouter.get("/:id", getPrestadorExperience);

export default experienceRouter;
