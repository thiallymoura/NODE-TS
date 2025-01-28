import { Request, Response } from "express";
import { UserService } from "../services/UserService";

//validações referentes as requisições

export class UserController{
    userService: UserService

    constructor(userService = new UserService()){ //cria o usuário
        this.userService = userService //pega o usuário
    }
        
    createUser = (request: Request, response: Response): any => { 
   
        const user = request.body; //pega o corpo da requisição

        // Verifica se o campo 'name' foi preenchido
        if(!user.name){ 
            return response.status(400).json({message: "Bad request! O campo name é obrigatório"});
        }

        // Verifica se o campo 'name' foi preenchido
        if(!user.email){ 
            return response.status(400).json({ message: "Bad request! O campo email é obrigatório" });

        }

        // Chama o serviço para criar o usuário
        this.userService.createUser(user.name, user.email); //cria o usuário
        return response.status(201).json({message: "Usuário criado com sucesso"});
    }

    getAllUsers = (request: Request, response: Response): any => {
        const users = this.userService.getAllUsers(); // Usa o serviço já instanciado
        return response.status(200).json(users);
    };

    deleteUser = (request: Request, response: Response): any => {
        const { email } = request.body; // Agora estamos pegando o email
    
        if (!email) {
            return response.status(400).json({ message: "Bad request! O campo email é obrigatório" });
        }
    
        const wasDeleted = this.userService.deleteUser(email); // Passa o email para o serviço de deleção
    
        if (wasDeleted) {
            return response.status(200).json({ message: "Usuário deletado com sucesso" });
        } else {
            return response.status(404).json({ message: "Usuário não encontrado" });
        }
    };
}



// getAllUsers = (request: Request, response: Response): any => {
//     const userService = new UserService(); //cria o usuário
//     const users = userService.getAllUsers(); //pega todos os usuários
//     return response.status(200).json(users); //retorna os usuários
// }