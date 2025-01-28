import express, { Request, Response} from "express"; //import express
import { router } from "./routes";


//arquivo de configuração

const server = express(); //iniciar o servidor
server.use(express.json()); //configurar o servidor para aceitar JSON
server.use(router); //configurar o servidor para usar as rotas

//criar uma rota
server.get("/", (req: Request, res: Response): any => {
    return res.status(200).json({message: "DioBank API"});
});

//iniciar o servidor na porta 5000
server.listen(5000, () => console.log("Servidor on"));
