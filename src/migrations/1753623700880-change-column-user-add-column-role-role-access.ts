import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeColumnUserAddColumnRoleRoleAccess1753623700880 implements MigrationInterface {
    name = 'ChangeColumnUserAddColumnRoleRoleAccess1753623700880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role_access" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "created_by" character varying NOT NULL DEFAULT 'SYSTEM', "updated_by" character varying NOT NULL DEFAULT 'SYSTEM', "ref_id" bigint, "user_id" uuid, "role_id" uuid, CONSTRAINT "UQ_184e87840bd954a1dc4b4810459" UNIQUE ("user_id", "role_id"), CONSTRAINT "PK_d53bf5646eeebac0ed7665061ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "created_by" character varying NOT NULL DEFAULT 'SYSTEM', "updated_by" character varying NOT NULL DEFAULT 'SYSTEM', "ref_id" bigint, "email" character varying NOT NULL, "full_name" character varying(100) NOT NULL, "user_name" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "phone_number" character varying(15) NOT NULL, "token" character varying NOT NULL, "role_id" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "created_by" character varying NOT NULL DEFAULT 'SYSTEM', "updated_by" character varying NOT NULL DEFAULT 'SYSTEM', "ref_id" bigint, "name" character varying NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "role_access" ADD CONSTRAINT "FK_d4197cd2a89cf9c1180dbe0f8d0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_access" ADD CONSTRAINT "FK_2f7f67d507a08448012c08be75b" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "role_access" DROP CONSTRAINT "FK_2f7f67d507a08448012c08be75b"`);
        await queryRunner.query(`ALTER TABLE "role_access" DROP CONSTRAINT "FK_d4197cd2a89cf9c1180dbe0f8d0"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "role_access"`);
    }

}
