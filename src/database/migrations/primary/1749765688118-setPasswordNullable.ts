import { MigrationInterface, QueryRunner } from "typeorm";

export class SetPasswordNullable1749765688118 implements MigrationInterface {
    name = 'SetPasswordNullable1749765688118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
    }

}
