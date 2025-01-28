export interface User {
    name: string;
    email: string;
}

const db = [
    {
        name: "Heton",
        email: "helton@dio.bank"
    }
]

//manipular regras de negocio/ banco de dados 
// PROCESSO QUE DEFINE COMO O SISTEMA VAI FUNCIONAR PARA ATINGIR O OBJETIVO OU RESOLVER O PROBLEMA

export class UserService {

    db: User[]

    constructor(databse = db){
        this.db = databse //pega o banco de dados
    }

    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }
        this.db.push(user); //adiciona o usuário
        console.log("DB atualizado", this.db); 
    }

    //retorna todos os usuários
    getAllUsers = () => {
        return db;
    }

    // Remove um usuário com base no email
    deleteUser(email: string): boolean {
        const userIndex = this.db.findIndex((user) => user.email === email); // Busca pelo email
        if (userIndex === -1) {
            return false; // Usuário não encontrado
        }
        this.db.splice(userIndex, 1); // Remove o usuário
        console.log("Usuário removido. DB atualizado", this.db);
        return true; // Usuário deletado com sucesso
    }
}
