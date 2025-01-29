// configurar as rotas da aplicação
// controlar todas as rotas da api 

import { Router} from "express";
import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";
import { verifyAuth } from "./midlleware/verifyAuth";


//criar uma rota
export const router = Router();

const userController = new UserController(); //cria o usuário
const loginController = new LoginController();


//Rota do usuário
router.post("/user", userController.createUser); //cria o usuário
router.get("/user/:userId", verifyAuth, userController.getUser); //usuario verificado
router.delete("/user", userController.deleteUser); // Deleta usuário pelo email

//Rota de login
router.post("/login", loginController.login); 




