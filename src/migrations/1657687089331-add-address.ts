import {MigrationInterface, QueryRunner} from "typeorm";

export class addAddress1657687089331 implements MigrationInterface {
    name = 'addAddress1657687089331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "department" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "department" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "department" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "department" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "department" ADD "addr_line1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "department" ADD "addr_line2" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "department" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "department" ADD "zip" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "department" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "department" ADD "employee_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "UQ_8fb1ab29c9f1a8b3cb2f982501d" UNIQUE ("employee_id")`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "FK_8fb1ab29c9f1a8b3cb2f982501d" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "FK_8fb1ab29c9f1a8b3cb2f982501d"`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "UQ_8fb1ab29c9f1a8b3cb2f982501d"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "zip"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "addr_line2"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "addr_line1"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "department" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "department" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "department" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "department" ADD "name" character varying NOT NULL`);
    }

}
