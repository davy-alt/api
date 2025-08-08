import { Router } from "express"
import autorModel from "../models/autorModel.js";
import {
  CadastrarAutor,
  listarAutores,
  buscarAutor,
} from "../controllers/AutorController.js";

const router = Router();

router.post("/api/autores", CadastrarAutor);
router.get("/api/autores", listarAutores);
router.get("/api/autores/:id", buscarAutor);
router.put("/api/autores/:id", );
router.delete("/api/autores/:id",);

export default router;
