import { EntityManager } from "typeorm";
import { getMockEntityManager } from "../__mocks__/mockentityManager.mock";
import { User } from "../entities/User";
import { UserRepository } from "./UserRepository";

describe("UserRepository", () => {
    let userRepository: UserRepository //cria o repositorio
    let managerMock: Partial<EntityManager>

    const mockUser: User = {
        id_user: "12345",
        name: "Teste User ",
        email: "Test@dio.bank",
        password: "password"
    }

    //beforeAll -> executa antes de todos os testes
    beforeAll(async() => {//
        managerMock = await getMockEntityManager({saveReturn: mockUser}); //cria o managerMock
        userRepository = new UserRepository(managerMock as EntityManager);
    })

    it("Deve cadastrar um novo usuário no banco de dados ",async () => {
        const response = await userRepository.createUser(mockUser)
        expect(managerMock.save).toHaveBeenCalled()
        expect(response).toMatchObject(mockUser)
    })

})