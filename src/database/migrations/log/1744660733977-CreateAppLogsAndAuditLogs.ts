import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAppLogsAndAuditLogs1744660733977
  implements MigrationInterface
{
  name = 'CreateAppLogsAndAuditLogs1744660733977';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "audit_log" ("id" SERIAL NOT NULL, "actionType" character varying NOT NULL, "entity" character varying NOT NULL, "userId" integer NOT NULL, "beforeData" json, "afterData" json, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_07fefa57f7f5ab8fc3f52b3ed0b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "app_log" ("id" SERIAL NOT NULL, "level" character varying NOT NULL, "message" character varying, "info" character varying, "entity" character varying, "trace" character varying, "userId" integer, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7af13249a75b5842dc7b24a3280" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "app_log"`);
    await queryRunner.query(`DROP TABLE "audit_log"`);
  }
}
