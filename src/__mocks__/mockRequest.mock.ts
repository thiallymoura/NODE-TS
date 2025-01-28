import { Request } from "express"
import { Params } from "express-serve-static-core"


export const makeMockRequest = ({params, query}: {params?: Params, query?: Params}): Request => {
    const request = {
        params: params || { },
        query: query || { }
    }  as unknown // as unknown é usado para indicar que o tipo da variável não é conhecido    
    return request as Request
}
