import {MigrationInterface, QueryRunner} from "typeorm";

export class addEmployee1657715948122 implements MigrationInterface {
    name = 'addEmployee1657715948122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
    }

}
