import {MigrationInterface, QueryRunner} from "typeorm";

export class addAddress1657687413823 implements MigrationInterface {
    name = 'addAddress1657687413823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "FK_8fb1ab29c9f1a8b3cb2f982501d"`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "addr_line1" character varying NOT NULL, "addr_line2" character varying NOT NULL, "city" character varying NOT NULL, "zip" character varying NOT NULL, "state" character varying NOT NULL, "employee_id" uuid NOT NULL, CONSTRAINT "REL_7e77f562043393b08de949b804" UNIQUE ("employee_id"), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "addr_line1"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "addr_line2"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "zip"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "UQ_8fb1ab29c9f1a8b3cb2f982501d"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_7e77f562043393b08de949b804b" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_7e77f562043393b08de949b804b"`);
        await queryRunner.query(`ALTER TABLE "department" ADD "employee_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "UQ_8fb1ab29c9f1a8b3cb2f982501d" UNIQUE ("employee_id")`);
        await queryRunner.query(`ALTER TABLE "department" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "department" ADD "zip" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "department" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "department" ADD "addr_line2" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "department" ADD "addr_line1" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "FK_8fb1ab29c9f1a8b3cb2f982501d" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
