import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { randomUUID } from "crypto";

@Entity('users') //fazer a referência ao banco
export class User {
    @PrimaryGeneratedColumn() //chave primária que vai ser gerada automaticamente
    id_user: string;

    @Column({nullable: false}) //não pode ser nulo
    name: string;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    constructor(name: string, email: string, password: string) {
        this.id_user = randomUUID(); //gera um ID aleatório
        this.name = name;
        this.email = email;
        this.password = password;
    }
}