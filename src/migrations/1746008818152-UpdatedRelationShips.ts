import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedRelationShips1746008818152 implements MigrationInterface {
    name = 'UpdatedRelationShips1746008818152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" ADD "userEntityId" integer`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_9ab9ed0ab9f3b22477f34516257" FOREIGN KEY ("userEntityId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_9ab9ed0ab9f3b22477f34516257"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "userEntityId"`);
    }

}
