import { request, Request, response, Response } from "express";
import { UserService } from "../services/UserService";

//validações referentes as requisições

export class UserController{
    userService: UserService

    constructor(userService = new UserService()){ //cria o usuário
        this.userService = userService //pega o usuário
    }
    
    //cria o usuário
    createUser = (request: Request, response: Response): any => { 
   
        const user = request.body; //pega o corpo da requisição

        // Verifica se o campo 'name' foi preenchido
        if(!user.name){ 
            return response.status(400).json({message: "Bad request! Todos os campos são obrigatórios"});
        }

        // Verifica se o campo 'name' foi preenchido
        if(!user.email){ 
            return response.status(400).json({ message: "Bad request! Todos os campos são obrigatórios" });

        }

        // Verifica se o campo 'name' foi preenchido
        if(!user.password){ 
            return response.status(400).json({ message: "Bad request! Todos os campos são obrigatórios" });

        }

        // Chama o serviço para criar o usuário
        this.userService.createUser(user.name, user.email, user.password); //cria o usuário
        return response.status(201).json({message: "Usuário criado com sucesso"});
    }

    // alterado aqui - pega o usuário
    getUser = (request: Request, response: Response): any => {
        return response.status(200)
    };

    // alterado aqui - deleta o usuário
    deleteUser = async (request: Request, response: Response): Promise<Response> => {
        const { email } = request.body;

        if (!email) {
            return response.status(400).json({ message: "Bad request! O campo email é obrigatório" });
        }

        const userDeleted = await this.userService.deleteUser(email);

        if (!userDeleted) {
            return response.status(404).json({ message: "Usuário não encontrado" });
        }

        return response.status(200).json({ message: "Usuário deletado com sucesso" });
    };
}


// deleteUser = (request: Request, response: Response):any => {
//     const user = request.body
//     console.log("Deletando usuário....", user)
//     return response.status(200).json({message: "Usuário deletado com sucesso"})
// }



// getAllUsers = (request: Request, response: Response): any => {
//     const userService = new UserService(); //cria o usuário
//     const users = userService.getAllUsers(); //pega todos os usuários
//     return response.status(200).json(users); //retorna os usuários
// }




// deleteUser = async (request: Request, response: Response): Promise<any> => {
//     const { email } = request.body; // Agora estamos pegando o email

//     if (!email) {
//         return response.status(400).json({ message: "Bad request! O campo email é obrigatório" });
//     }

//     const wasDeleted = this.userService.deleteUser(email); // Passa o email para o serviço de deleção

//     if (await wasDeleted) {
//         return response.status(200).json({ message: "Usuário deletado com sucesso" });
//     } else {
//         return response.status(404).json({ message: "Usuário não encontrado" });
//     }
// };

