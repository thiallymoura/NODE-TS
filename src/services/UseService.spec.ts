import { UserService } from "./UserService";


jest.mock("../repositories/UserRepository")//criando o mock
jest.mock("../database", () => ({
    intialize: jest.fn() //
}))

const mockUserRepository = require("../repositories/UserRepository") //importando o mock

describe("UserService", () => {
    const userService = new UserService(mockUserRepository); //cria o usuário

    it("Deve adicionar um novo usuário", async() => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve({
           id_user: "123456",
           name: "Caio",
           email: "Caio@test.bank",
           password: "123456"
            
        })); //cria o mock para o createUser
        
        const response =await userService.createUser("Caio", "Caio@test.bank", "123456");
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({
            id_user: "123456",
           name: "Caio",
           email: "Caio@test.bank",
           password: "123456"
        })
    })

    //alterado aqui 
    it("Deve remover um usuário pelo email", async () => {
        mockUserRepository.getUser = jest.fn().mockResolvedValue({
            id_user: "123456",
            name: "Caio",
            email: "Caio@test.bank",
            password: "123456"
        });
        mockUserRepository.deleteUser = jest.fn().mockResolvedValue(undefined);

        const response = await userService.deleteUser("Caio@test.bank");
        
        expect(mockUserRepository.getUser).toHaveBeenCalledWith("Caio@test.bank");
        expect(mockUserRepository.deleteUser).toHaveBeenCalledWith("Caio@test.bank");
        expect(response).toBe(true);
    });

    it("Deve retornar falso ao tentar remover um usuário inexistente", async () => {
        mockUserRepository.getUser = jest.fn().mockResolvedValue(null);
        
        const response = await userService.deleteUser("naoexiste@test.bank");
        
        expect(mockUserRepository.getUser).toHaveBeenCalledWith("naoexiste@test.bank");
        expect(mockUserRepository.deleteUser).not.toHaveBeenCalled();
        expect(response).toBe(false);
    });
})

































// import { User, UserService } from "./UserService";

// describe("UserService", () => {
//     const mockDb: User[] = [];
//     const userService = new UserService(mockDb); //cria o usuário

//     it("Deve adicionar um novo usuário", () => {
//         const mockConsole = jest.spyOn(global.console, "log"); //armazena a função log no mockConsole
//         userService.createUser("Caio", "Caio@test.bank");
//         expect (mockConsole).toHaveBeenCalledWith("DB atualizado", mockDb);
//     })
// })