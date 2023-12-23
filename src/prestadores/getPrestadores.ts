import { Request, Response } from "express";
import { getPool } from "../db/db";
import { getPrestadoresNoFilters } from "./getPrestadoresNoFilters";
import { getPrestadoresByComuna } from "./getPrestadoresByComuna";
import { getPrestadoresByServicio } from "./getPrestadoresByServicio";
import { getPrestadoresByServicioAndEspecialidad } from "./getPrestadoresByServicioAndEspecialidad";
import { getPrestadoresByComunaAndServicioAndEspecialidad } from "./getPrestadoresByComunaAndServicioAndEspecialidad";
import { getPrestadoresByComunaAndServicio } from "./getPrestadoresByComunaAndServicio";

export const getPrestadores = async (req: Request, res: Response) => {
  console.log("fetching prestadores");
  const servicio = Number(req.query.servicio);
  const comuna = Number(req.query.comuna);
  const especialidad = Number(req.query.especialidad);

  console.log("servicio, comuna, especialidad", servicio, comuna, especialidad);

  // handle different cases:
  // 1. no filters
  if (!comuna && !servicio) {
    return getPrestadoresNoFilters(res);
  }
  // with comuna and servicio

  if (comuna && servicio && !especialidad) {
    getPrestadoresByComunaAndServicio(res, comuna, servicio);
  }

  // 2. only comuna
  if (comuna && !servicio && !especialidad) {
    return getPrestadoresByComuna(res, comuna);
  }
  // 3. only service
  if (!comuna && servicio && !especialidad) {
    return getPrestadoresByServicio(res, servicio);
  }
  // 4. only service and especiliadad
  if (!comuna && servicio && especialidad) {
    return getPrestadoresByServicioAndEspecialidad(res, servicio, especialidad);
  }
  // 5. with comuna, servicio and especialidad
  if (comuna && servicio && especialidad) {
    return getPrestadoresByComunaAndServicioAndEspecialidad(res, comuna, servicio, especialidad);
  }
};
