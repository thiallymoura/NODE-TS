import { EntityManager } from "typeorm";


interface MockManagerArgs {
    saveReturn?: object | [object]
    findOneReturn?: object 
    removeReturn?: object; // Adicionando parâmetro para mock de remove
}

export const getMockEntityManager = async({
    saveReturn = undefined,
    findOneReturn = undefined,
    removeReturn = undefined // Recebe o valor de retorno de remove

}: MockManagerArgs): Promise<EntityManager> => { //a funçao que vai retornar o manager para manipular 
    const manager: Partial<EntityManager> = {} //cria um manager vazio em um objeto parcial

    manager.save = jest.fn().mockImplementation(() => Promise.resolve(saveReturn)); //cria um mock para o save
    manager.findOne = jest.fn().mockImplementation(() => Promise.resolve(findOneReturn));
    manager.remove = jest.fn().mockImplementation(() => Promise.resolve(removeReturn)); // Mock de remove

    return manager as EntityManager; //retorna o manager
};