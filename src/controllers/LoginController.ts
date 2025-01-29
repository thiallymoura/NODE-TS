import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { UserService } from "../services/UserService";

export class LoginController{

    userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    login = async (request: Request, response: Response): Promise<any> => {
        const {email, password} = request.body

        try {
            const token = await this.userService.getToken(email, password)

            return response.status(200).json({token: token})
        } catch (error) {
            return response.status(500).json({ message: "Usuário/senha incorretos" })
        }
        
    }
}









