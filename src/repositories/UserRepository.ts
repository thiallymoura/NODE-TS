import { EntityManager } from "typeorm";
import { User } from "../entities/User";



export class UserRepository {  
    private manager: EntityManager; //gerenciador de entidades

    constructor(manager: EntityManager) { //appdatasource.manager é o gerenciador de entidades do index do database
        this.manager = manager; // o manager vai usar mockado 
    }

    createUser = async (user: User): Promise<User> => { //async -> manipulação de arquivos, sem bloquear a execução do código
        return this.manager.save(user); //acessa o manager da classe, busca a função save e salva o usário
    }

    getUser = async (userId: string): Promise<User | null> => { //async -> manipulação de arquivos, sem bloquear a execução do código
        return this.manager.findOne(User, { //acessa o manager da classe, busca apenas um objeto do tipo User
            where: { //busca os usários pelo id
                id_user: userId 
            }
        })
    }   

    getUserByEmailAndPassword = async (email: string, password: string): Promise<User | null> => { //async -> manipulação de arquivos, sem bloquear a execução do código
        return this.manager.findOne(User, { //acessa o manager da classe, busca apenas um objeto do tipo User
            where: { //busca os usários pelo email e senha
                email: email,
                password: password
            }
        })
    }
    
    //alterado aqui para buscar pelo email
    deleteUser = async (email: string): Promise<boolean> => { //async -> manipulação de arquivos, sem bloquear a execução do código
        const user = await this.manager.findOne(User, { //acessa o manager da classe, busca apenas um objeto do tipo User
            where: { //busca os usários pelo email
                email: email 
            }
        })
        if (user) { //se o usário for encontrado
            await this.manager.remove(user); //remove o usário
            return true; //retorna true
        }
        return false; //retorna false
    }
    // async deleteUser(email: string): Promise<void> {
    //     const user = await this.getUser(email); 
    //     if (user) {
    //         await this.manager.remove(user); // Remove a entidade encontrada
    //     }
    // }
    

}