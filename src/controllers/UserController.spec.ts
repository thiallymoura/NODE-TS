import { UserService } from "../services/UserService";
import { UserController } from "./UserController";
import { Request } from "express";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

const mockUserService = {
    createUser: jest.fn(),
            //     getAllUsers: jest.fn(),
    getUser: jest.fn(),
            //     updateUser: jest.fn(),
    deleteUser: jest.fn()
            
}

jest.mock('../services/UserService', () => { 
    return {
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService
            
        })
    }
}) //criando o mock

describe("UserController", () => {
     

    // Criação do controller utilizando o mock do serviço
    const userController = new UserController(); 
    
    
    it("Deve adicionar um novo usuário", () => {
        const mockRequest = {
            body: {
                name: "Caio",
                email: "Caio@test.bank",
                password: "password"
                
            }
        } as Request
        const mockResponse = makeMockResponse()
        // Chama o método createUser do controller
        userController.createUser(mockRequest, mockResponse)
        // Verifica se o status retornado é 201
        expect(mockResponse.state.status).toBe(201)
        // Verifica se a resposta contém a mensagem correta
        expect(mockResponse.state.json).toMatchObject({message: "Usuário criado com sucesso"});
    })

    it("Deve retornar erro se o campo 'name' não for informado", () => {
        const mockRequest = {
            body: {
                name: "", // Requisição sem o campo 'name'
                email: "Caio@test.bank", 
                password: "password"
            }
        } as Request;
        const mockResponse = makeMockResponse();
    
        // Chama o método createUser do controller
        userController.createUser(mockRequest, mockResponse);
    
        // Verifica se o status retornado é 400
        expect(mockResponse.state.status).toBe(400);
 
        // Verifica se a resposta contém a mensagem de erro correta
        expect(mockResponse.state.json).toMatchObject({ message: "Bad request! Todos os campos são obrigatórios" });
    });

    it("Deve retornar erro se o campo 'email' não for informado", () => {
        const mockRequest = {
            body: {
                name: "Caio", 
                email: "", // Requisição sem o campo 'email'
                password: "password"
            }
        } as Request;
        const mockResponse = makeMockResponse();
    
        // Chama o método createUser do controller
        userController.createUser(mockRequest, mockResponse);
    
        // Verifica se o status retornado é 400
        expect(mockResponse.state.status).toBe(400);
    
        // Verifica se a resposta contém a mensagem de erro correta
        expect(mockResponse.state.json).toMatchObject({ message: "Bad request! Todos os campos são obrigatórios" });
    });


    it("Deve retornar erro se o campo 'password' não for informado", () => {
        const mockRequest = {
            body: {
                name: "Caio", 
                email: "Caio@test.bank",
                password: "" // Requisição sem o campo 'password'
            }
        } as Request;
        const mockResponse = makeMockResponse();
    
        // Chama o método createUser do controller
        userController.createUser(mockRequest, mockResponse);
    
        // Verifica se o status retornado é 400
        expect(mockResponse.state.status).toBe(400);
    
        // Verifica se a resposta contém a mensagem de erro correta
        expect(mockResponse.state.json).toMatchObject({ message: "Bad request! Todos os campos são obrigatórios" });
    });

    // it("Deve verificar se a função get está sendo chamada", () => { 
    //     const mockRequest = {} as Request; // Requisição vazia para o método getAllUsers
    //     const mockResponse = makeMockResponse();

    //     // Chama o método getAllUsers do controller
    //     userController.getUser(mockRequest, mockResponse);

    //     // Verifica se a função getAllUsers do serviço foi chamada
    //     expect(mockUserService.getUser).toHaveBeenCalled();

    //     // Verifica se o status retornado é 200
    //     expect(mockResponse.state.status).toBe(200);

    //     // Verifica se a resposta contém os dados retornados pelo serviço
    //     expect(mockResponse.state.json).toMatchObject([{ name: "Test User", email: "test@test.com" }]);
    // });

    it("Deve retornar erro ao tentar deletar um usuário sem email", async () => {
        const mockRequest = {
            body: { email: "" }
        } as Request;
        const mockResponse = makeMockResponse();
        
        await userController.deleteUser(mockRequest, mockResponse);
        
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: "Bad request! O campo email é obrigatório" });
    });

    it("Deve retornar mensagem de sucesso ao deletar usuário", async () => {
        const mockRequest = {
            body: { email: "caio@test.bank" }
        } as Request;
        const mockResponse = makeMockResponse();
        
        jest.spyOn(userController.userService, "deleteUser").mockResolvedValue(true);
        
        await userController.deleteUser(mockRequest, mockResponse);
        
        expect(mockResponse.state.status).toBe(200);
        expect(mockResponse.state.json).toMatchObject({ message: "Usuário deletado com sucesso" });
    });

    it("Deve retornar erro ao tentar deletar um usuário inexistente", async () => {
        const mockRequest = {
            body: { email: "naoexiste@test.bank" }
        } as Request;
        const mockResponse = makeMockResponse();
        
        jest.spyOn(userController.userService, "deleteUser").mockResolvedValue(false);
        
        await userController.deleteUser(mockRequest, mockResponse);
        
        expect(mockResponse.state.status).toBe(404);
        expect(mockResponse.state.json).toMatchObject({ message: "Usuário não encontrado" });
    });
    
//     it("Deve retornar a mensagem de usuário deletado" , () => {
//         const mockRequest = {
//             body: {
//                 name: "Caio",
//                 email: "" 
//             }
//         } as Request;

//         const mockResponse = makeMockResponse();
//         // Chama o método deleteUser do controller
//         userController.deleteUser(mockRequest, mockResponse);
    
//         // Verifica se o status retornado é 200
//         expect(mockResponse.state.status).toBe(200);
    
//         // Verifica se a resposta contém a mensagem de sucesso
//         expect(mockResponse.state.json).toMatchObject({ message: "Usuário deletado com sucesso" });
//     });
})


//     it("Deve deletar um usuário com sucesso", () => {
//         const mockRequest = {
//             body: {
//                 email: "caio@dio.bank" // Usando o email
//             }
//         } as Request;
//         const mockResponse = makeMockResponse();
    
//         mockUserService.deleteUser = jest.fn().mockReturnValue(true); // Mock da função deleteUser
    
//         // Chama o método deleteUser do controller
//         userController.deleteUser(mockRequest, mockResponse);
    
//         // Verifica se o status retornado é 200
//         expect(mockResponse.state.status).toBe(200);
    
//         // Verifica se a resposta contém a mensagem de sucesso
//         expect(mockResponse.state.json).toMatchObject({ message: "Usuário deletado com sucesso" });
//     });
    
//     it("Deve retornar erro se o ID não for informado", () => {
//         const mockRequest = {
//             body: {} // Sem o campo email
//         } as Request;
//         const mockResponse = makeMockResponse();
    
//         // Chama o método deleteUser do controller
//         userController.deleteUser(mockRequest, mockResponse);
    
//         // Verifica se o status retornado é 400
//         expect(mockResponse.state.status).toBe(400);
    
//         // Verifica se a resposta contém a mensagem de erro
//         expect(mockResponse.state.json).toMatchObject({ message: "Bad request! O campo email é obrigatório" });
//     });
    
//     it("Deve retornar erro se o usuário não for encontrado", () => {
//         const mockRequest = {
//             body: {
//                 email: "naoexiste@dio.bank" // Email que não existe
//             }
//         } as Request;
//         const mockResponse = makeMockResponse();
    
//         mockUserService.deleteUser = jest.fn().mockReturnValue(false); // Mock da função deleteUser
    
//         // Chama o método deleteUser do controller
//         userController.deleteUser(mockRequest, mockResponse);
    
//         // Verifica se o status retornado é 404
//         expect(mockResponse.state.status).toBe(404);
    
//         // Verifica se a resposta contém a mensagem de erro
//         expect(mockResponse.state.json).toMatchObject({ message: "Usuário não encontrado" });
//     });




























// import { UserService } from "../services/UserService";
// import { UserController } from "./UserController";
// import { Request } from "express";
// import { makeMockResponse } from "../__mocks__/mockResponse.mock";


// describe("UserController", () => {
//      // Mock do serviço de usuário para simular os métodos createUser e getAllUsers
//     const mockUserService: Partial<UserService> = {
//         createUser: jest.fn(), // Mock para o método createUser
//         getAllUsers: jest.fn(() => [{ name: "Test User", email: "test@test.com", id: 1 }]) // Mock para o método getAllUsers retornando um usuário de exemplo
//     }

//     // Criação do controller utilizando o mock do serviço
//     const userController = new UserController(mockUserService as UserService); 
    
//     it("Deve adicionar um novo usuário", () => {
//         const mockRequest = {
//             body: {
//                 name: "Caio",
//                 email: "Caio@test.bank"
//             }
//         } as Request
//         const mockResponse = makeMockResponse()
//         // Chama o método createUser do controller
//         userController.createUser(mockRequest, mockResponse)
//         // Verifica se o status retornado é 201
//         expect(mockResponse.state.status).toBe(201)
//         // Verifica se a resposta contém a mensagem correta
//         expect(mockResponse.state.json).toMatchObject({message: "Usuário criado com sucesso"});
//     })

//     it("Deve retornar erro se o campo 'name' não for informado", () => {
//         const mockRequest = {
//             body: {
//                 email: "Caio@test.bank" // Requisição sem o campo 'name'
//             }
//         } as Request;
//         const mockResponse = makeMockResponse();
    
//         // Chama o método createUser do controller
//         userController.createUser(mockRequest, mockResponse);
    
//         // Verifica se o status retornado é 400
//         expect(mockResponse.state.status).toBe(400);
 
//         // Verifica se a resposta contém a mensagem de erro correta
//         expect(mockResponse.state.json).toMatchObject({ message: "Bad request! O campo name é obrigatório" });
//     });

//     it("Deve retornar erro se o campo 'email' não for informado", () => {
//         const mockRequest = {
//             body: {
//                 name: "Caio" // Requisição sem o campo 'email'
//             }
//         } as Request;
//         const mockResponse = makeMockResponse();
    
//         // Chama o método createUser do controller
//         userController.createUser(mockRequest, mockResponse);
    
//         // Verifica se o status retornado é 400
//         expect(mockResponse.state.status).toBe(400);
    
//         // Verifica se a resposta contém a mensagem de erro correta
//         expect(mockResponse.state.json).toMatchObject({ message: "Bad request! O campo email é obrigatório" });
//     });

//     it("Deve verificar se a função getAllUsers está sendo chamada", () => {
//         const mockRequest = {} as Request; // Requisição vazia para o método getAllUsers
//         const mockResponse = makeMockResponse();

//         // Chama o método getAllUsers do controller
//         userController.getAllUsers(mockRequest, mockResponse);

//         // Verifica se a função getAllUsers do serviço foi chamada
//         expect(mockUserService.getAllUsers).toHaveBeenCalled();

//         // Verifica se o status retornado é 200
//         expect(mockResponse.state.status).toBe(200);

//         // Verifica se a resposta contém os dados retornados pelo serviço
//         expect(mockResponse.state.json).toMatchObject([{ name: "Test User", email: "test@test.com" }]);
//     });


//     it("Deve deletar um usuário com sucesso", () => {
//         const mockRequest = {
//             body: {
//                 email: "caio@dio.bank" // Usando o email
//             }
//         } as Request;
//         const mockResponse = makeMockResponse();
    
//         mockUserService.deleteUser = jest.fn().mockReturnValue(true); // Mock da função deleteUser
    
//         // Chama o método deleteUser do controller
//         userController.deleteUser(mockRequest, mockResponse);
    
//         // Verifica se o status retornado é 200
//         expect(mockResponse.state.status).toBe(200);
    
//         // Verifica se a resposta contém a mensagem de sucesso
//         expect(mockResponse.state.json).toMatchObject({ message: "Usuário deletado com sucesso" });
//     });
    
//     it("Deve retornar erro se o ID não for informado", () => {
//         const mockRequest = {
//             body: {} // Sem o campo email
//         } as Request;
//         const mockResponse = makeMockResponse();
    
//         // Chama o método deleteUser do controller
//         userController.deleteUser(mockRequest, mockResponse);
    
//         // Verifica se o status retornado é 400
//         expect(mockResponse.state.status).toBe(400);
    
//         // Verifica se a resposta contém a mensagem de erro
//         expect(mockResponse.state.json).toMatchObject({ message: "Bad request! O campo email é obrigatório" });
//     });
    
//     it("Deve retornar erro se o usuário não for encontrado", () => {
//         const mockRequest = {
//             body: {
//                 email: "naoexiste@dio.bank" // Email que não existe
//             }
//         } as Request;
//         const mockResponse = makeMockResponse();
    
//         mockUserService.deleteUser = jest.fn().mockReturnValue(false); // Mock da função deleteUser
    
//         // Chama o método deleteUser do controller
//         userController.deleteUser(mockRequest, mockResponse);
    
//         // Verifica se o status retornado é 404
//         expect(mockResponse.state.status).toBe(404);
    
//         // Verifica se a resposta contém a mensagem de erro
//         expect(mockResponse.state.json).toMatchObject({ message: "Usuário não encontrado" });
//     });
// })

















// import { UserService } from "../services/UserService";
// import { UserController } from "./UserController";
// import { Request } from "express";
// import { makeMockResponse } from "../__mocks__/mockResponse.mock";


// describe("UserController", () => {
//     const mockUserService: Partial<UserService> = {
//         createUser: jest.fn()
//     }

//     const userController = new UserController(mockUserService as UserService); //cria o usuário
    
//     it("Deve adicionar um novo usuário", () => {
//         const mockRequest = {
//             body: {
//                 name: "Caio",
//                 email: "Caio@test.bank"
//             }
//         } as Request
//         const mockResponse = makeMockResponse()
//         userController.createUser(mockRequest, mockResponse) //cria o usuário
//         expect(mockResponse.state.status).toBe(201)
//         expect(mockResponse.state.json).toMatchObject({message: "Usuário criado com sucesso"});
//     })
// })