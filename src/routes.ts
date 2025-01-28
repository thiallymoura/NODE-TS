// configurar as rotas da aplicação
// controlar todas as rotas da api 

import { Router, Request, Response } from "express";
import { UserController } from "./controllers/UserController";

//criar uma rota
export const router = Router();

const userController = new UserController(); //cria o usuário

//Rota do usuário
router.post("/user", userController.createUser); //cria o usuário
router.get("/user", userController.getAllUsers); //pega todos os usuários
router.delete("/user", userController.deleteUser); // Deleta usuário pelo ID
