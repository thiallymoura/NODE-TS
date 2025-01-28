import { DataSource } from "typeorm"

//configuração do banco de dados
export const AppDataSource = new DataSource({ 
    type: "sqlite",
    database: "./src/database/db.sqlite",
    migrations:[
        "./src/database/migrations/*.ts",
    ], 
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source inicializado!")
    })
    .catch((error) => {
        console.error(error)
    })