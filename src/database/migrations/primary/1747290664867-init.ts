import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1747290664867 implements MigrationInterface {
    name = 'Init1747290664867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."otps_purpose_enum" AS ENUM('user-verification', 'forgot-password')`);
        await queryRunner.query(`CREATE TABLE "otps" ("id" SERIAL NOT NULL, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "otp" character varying NOT NULL, "purpose" "public"."otps_purpose_enum" NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_91fef5ed60605b854a2115d2410" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fcm_tokens" ("id" SERIAL NOT NULL, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "token" character varying NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_0802a779d616597e9330bb9a7cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_profile_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "user_profile" ("id" SERIAL NOT NULL, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "age" integer NOT NULL, "gender" "public"."user_profile_gender_enum" NOT NULL, "nic" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "user_id" integer NOT NULL, "location" geography(Point,4326) NOT NULL, CONSTRAINT "REL_eee360f3bff24af1b689076520" UNIQUE ("user_id"), CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_34f5323ad1abd9c0011bff3fe7" ON "user_profile" USING GiST ("location") `);
        await queryRunner.query(`CREATE TABLE "vehicle_users" ("id" SERIAL NOT NULL, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "vehicle_id" character varying NOT NULL, "user_id" character varying NOT NULL, "vehicleId" integer, "userId" integer, CONSTRAINT "PK_256204604eb382d7cabc32e4e19" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."notification_type_enum" AS ENUM('invitation_rejected_from_contractor', 'invitation_accepted_from_contractor', 'invitation_rejected_from_coordinator', 'invitation_accepted_from_coordinator', 'invitation_received_from_coordinator', 'contractor_hired_by_coordinator', 'hiring_cancelled_by_coordinator', 'invitation_cancelled_by_coordinator', 'one_day_left_for_job')`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "receiverId" integer NOT NULL, "senderId" integer, "type" "public"."notification_type_enum" NOT NULL, "resourceId" integer, "read" boolean DEFAULT false, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_providertype_enum" AS ENUM('google', 'apple', 'emailPassword')`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "phone" character varying, "profile_image_url" character varying, "is_verified" boolean NOT NULL DEFAULT false, "is_onboarded" boolean NOT NULL DEFAULT false, "email" character varying NOT NULL, "password" character varying NOT NULL, "providerType" "public"."user_providertype_enum" DEFAULT 'emailPassword', "role" "public"."user_role_enum" DEFAULT 'user', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."vehicle_vehicletype_enum" AS ENUM('car', 'truck', 'motorcycle', 'bus', 'bicycle', 'van', 'suv')`);
        await queryRunner.query(`CREATE TYPE "public"."vehicle_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED', 'IN_PROGRESS', 'ON_THE_WAY', 'ARRIVED', 'STARTED', 'ENDED', 'FAILED')`);
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" SERIAL NOT NULL, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "model" character varying NOT NULL, "numberPlate" character varying NOT NULL, "vehicleType" "public"."vehicle_vehicletype_enum" NOT NULL, "image" text array NOT NULL, "status" "public"."vehicle_status_enum" NOT NULL, "ownerId" integer, CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."log_env_enum" AS ENUM('development', 'staging', 'production')`);
        await queryRunner.query(`CREATE TABLE "log" ("id" SERIAL NOT NULL, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "message" character varying NOT NULL, "stack" character varying, "context" character varying, "env" "public"."log_env_enum" NOT NULL, CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "otps" ADD CONSTRAINT "FK_3938bb24b38ad395af30230bded" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fcm_tokens" ADD CONSTRAINT "FK_9fd867cabc75028a5625ce7b24c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_eee360f3bff24af1b6890765201" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicle_users" ADD CONSTRAINT "FK_2c75a514cdec4eb143879bde737" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicle_users" ADD CONSTRAINT "FK_0a818b151281852cbb31e8eecb3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_758d70a0e61243171e785989070" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_c0af34102c13c654955a0c5078b" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "FK_61e825bc57f59788efc068a6134" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "FK_61e825bc57f59788efc068a6134"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_c0af34102c13c654955a0c5078b"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_758d70a0e61243171e785989070"`);
        await queryRunner.query(`ALTER TABLE "vehicle_users" DROP CONSTRAINT "FK_0a818b151281852cbb31e8eecb3"`);
        await queryRunner.query(`ALTER TABLE "vehicle_users" DROP CONSTRAINT "FK_2c75a514cdec4eb143879bde737"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_eee360f3bff24af1b6890765201"`);
        await queryRunner.query(`ALTER TABLE "fcm_tokens" DROP CONSTRAINT "FK_9fd867cabc75028a5625ce7b24c"`);
        await queryRunner.query(`ALTER TABLE "otps" DROP CONSTRAINT "FK_3938bb24b38ad395af30230bded"`);
        await queryRunner.query(`DROP TABLE "log"`);
        await queryRunner.query(`DROP TYPE "public"."log_env_enum"`);
        await queryRunner.query(`DROP TABLE "vehicle"`);
        await queryRunner.query(`DROP TYPE "public"."vehicle_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."vehicle_vehicletype_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_providertype_enum"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TYPE "public"."notification_type_enum"`);
        await queryRunner.query(`DROP TABLE "vehicle_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_34f5323ad1abd9c0011bff3fe7"`);
        await queryRunner.query(`DROP TABLE "user_profile"`);
        await queryRunner.query(`DROP TYPE "public"."user_profile_gender_enum"`);
        await queryRunner.query(`DROP TABLE "fcm_tokens"`);
        await queryRunner.query(`DROP TABLE "otps"`);
        await queryRunner.query(`DROP TYPE "public"."otps_purpose_enum"`);
    }

}
