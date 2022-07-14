import {MigrationInterface, QueryRunner} from "typeorm";

export class addDepartment1657621670327 implements MigrationInterface {
    name = 'addDepartment1657621670327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "department" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "department" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "department" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "created_at"`);
    }

}
