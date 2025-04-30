import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedEntryEntity1744022072020 implements MigrationInterface {
    name = 'UpdatedEntryEntity1744022072020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "currency"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" ADD "currency" character varying NOT NULL`);
    }

}
