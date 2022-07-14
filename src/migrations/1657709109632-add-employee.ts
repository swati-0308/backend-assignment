import {MigrationInterface, QueryRunner} from "typeorm";

export class addEmployee1657709109632 implements MigrationInterface {
    name = 'addEmployee1657709109632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
