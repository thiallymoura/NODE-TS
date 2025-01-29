import { EntityManager } from "typeorm";


interface MockManagerArgs {
    saveReturn?: object | [object]
    findOneReturn?: object 
}

export const getMockEntityManager = async({
    saveReturn = undefined,
    findOneReturn = undefined

}: MockManagerArgs): Promise<EntityManager> => { //a funçao que vai retornar o manager para manipular 
    const manager: Partial<EntityManager> = {} //cria um manager vazio em um objeto parcial

    manager.save = jest.fn().mockImplementation(() => Promise.resolve(saveReturn)); //cria um mock para o save
    manager.findOne = jest.fn().mockImplementation(() => Promise.resolve(findOneReturn));

    return manager as EntityManager; //retorna o manager
};