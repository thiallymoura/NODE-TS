//manipular regras de negocio/ banco de dados 
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../database";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";


// PROCESSO QUE DEFINE COMO O SISTEMA VAI FUNCIONAR PARA ATINGIR O OBJETIVO OU RESOLVER O PROBLEMA
export class UserService {
    private userRepository: UserRepository;

    constructor(
        userRepository = new UserRepository(AppDataSource.manager)
    ){
        this.userRepository = userRepository;
    }

    createUser = async (name: string, email: string, password: string): Promise<User> => {
        const user = new User(name, email, password);
        return this.userRepository.createUser(user);
       
    }

    //retorna o usuario
    getUser = async (userId: string): Promise<User | null> => {
        return this.userRepository.getUser(userId);
        
    }

    //retorna o usuário autenticado
    getAuthenticatedUser = async (email: string, password: string): Promise<User | null> => {
        return this.userRepository.getUserByEmailAndPassword(email, password);
    }

    //retorna o token
    getToken = async(email: string, password: string): Promise<string | null> => {
        const user = await this.getAuthenticatedUser(email, password);

        if (!user) {
            throw new Error("Usuário/senha incorretos"); 
        }

        const tokenData = {
            name: user?.name,
            email: user?.email
        }

        const tokenKey = "123456789"

        const tokenOption = { //configuracoes do token
            subject: user?.id_user
        }

        const token = sign(tokenData, tokenKey, tokenOption)

        return token
    }


    // alterado aqui Remove um usuário com base no email
    deleteUser = async (email: string): Promise<boolean> => {
        const user = await this.userRepository.getUser(email);
        if (user) {
            await this.userRepository.deleteUser(email);
            return true;
        }
        return false;
    }

}



// deleteUser = async (email: string): Promise<boolean> => {
//     const user = await this.userRepository.getUser(email);
//     if (!user) return false; 

//     await this.userRepository.deleteUser(email);
//     return true;
// };



//  // alterado aqui Remove um usuário com base no email
//  deleteUser = async (email: string): Promise<boolean> => {
//     return this.userRepository.deleteUser(email);
// }










// export interface User {
//     name: string;
//     email: string;
// }

// const db = [
//     {
//         name: "Heton",
//         email: "helton@dio.bank"
//     }
// ]

// //manipular regras de negocio/ banco de dados 
// // PROCESSO QUE DEFINE COMO O SISTEMA VAI FUNCIONAR PARA ATINGIR O OBJETIVO OU RESOLVER O PROBLEMA

// export class UserService {

//     db: User[]

//     constructor(databse = db){
//         this.db = databse //pega o banco de dados
//     }

//     createUser = (name: string, email: string) => {
//         const user = {
//             name,
//             email
//         }
//         this.db.push(user); //adiciona o usuário
//         console.log("DB atualizado", this.db); 
//     }

//     //retorna todos os usuários
//     getAllUsers = () => {
//         return db;
//     }

//     // Remove um usuário com base no email
//     deleteUser(email: string): boolean {
//         const userIndex = this.db.findIndex((user) => user.email === email); // Busca pelo email
//         if (userIndex === -1) {
//             return false; // Usuário não encontrado
//         }
//         this.db.splice(userIndex, 1); // Remove o usuário
//         console.log("Usuário removido. DB atualizado", this.db);
//         return true; // Usuário deletado com sucesso
//     }
// }
