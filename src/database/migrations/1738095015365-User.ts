import { MigrationInterface, QueryRunner, Table } from "typeorm";

//Migration -> arquivo que descreve alterações específicas no banco de dados, como criar, alterar ou excluir tabelas ou colunas, 
// permitindo que você sincronize o banco com as necessidades do código.

//up -> cria a tabela
//down -> deleta a tabela

export class User1738095015365 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id_user",
                        type: "string",
                        isPrimary: true
                    },

                    {
                        name: "name",
                        type: "string",
                        isNullable: false
                    },

                    {
                        name: "email", 
                        type: "string",
                        isNullable: false, //não pode ser nulo
                        isUnique: true //não pode ter emails iguais
                    },

                    {
                        name: "password",
                        type: "string",
                        isNullable: false
                    }
                ]

            })
        )
}

    public async down(queryRunner: QueryRunner): Promise < void> {
    await queryRunner.dropTable("users");
}

}
