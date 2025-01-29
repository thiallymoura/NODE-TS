import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export function verifyAuth(request: Request, response: Response, next: NextFunction): any { //verifica se o usuário está autenticado
    const authToken = request.headers.authorization;

    if (authToken) {
        const [, token] = authToken.split(' '); //separa o token

        try {
            const { sub } = verify(token, "123456789"); //verifica se o token é valido
            console.log("Usuário autenticado: ", sub);
            return next();

        } catch (error) {
            return response.status(401).json({ message: "Token inválido" });
        }
    }

    return response.status(401).json({ message: "Token inválido" });
}