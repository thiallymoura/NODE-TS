import { User, UserService } from "./UserService";

describe("UserService", () => {
    const mockDb: User[] = [];
    const userService = new UserService(mockDb); //cria o usuário

    it("Deve adicionar um novo usuário", () => {
        const mockConsole = jest.spyOn(global.console, "log"); //armazena a função log no mockConsole
        userService.createUser("Caio", "Caio@test.bank");
        expect (mockConsole).toHaveBeenCalledWith("DB atualizado", mockDb);
    })
})