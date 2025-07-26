import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsersTable1753124580805 implements MigrationInterface {
    name = 'AddUsersTable1753124580805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "created_by" character varying NOT NULL DEFAULT 'SYSTEM', "updated_by" character varying NOT NULL DEFAULT 'SYSTEM', "ref_id" bigint, "email" character varying NOT NULL, "full_name" character varying NOT NULL, "password" character varying NOT NULL, "phone_number" character varying NOT NULL, "avatar_url" character varying, "id_role" character varying NOT NULL, "token" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
