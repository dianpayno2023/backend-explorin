import { MigrationInterface, QueryRunner } from "typeorm";

export class AddcolumnRoleLocaladdressShippingaddressEtc1753872109838 implements MigrationInterface {
    name = 'AddcolumnRoleLocaladdressShippingaddressEtc1753872109838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_access" DROP CONSTRAINT "FK_2f7f67d507a08448012c08be75b"`);
        await queryRunner.query(`ALTER TABLE "role_access" DROP CONSTRAINT "UQ_184e87840bd954a1dc4b4810459"`);
        await queryRunner.query(`ALTER TABLE "role_access" RENAME COLUMN "role_id" TO "menu_id"`);
        await queryRunner.query(`CREATE TYPE "public"."regency_enum" AS ENUM('KABUPATEN', 'KOTA')`);
        await queryRunner.query(`CREATE TABLE "regencies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "created_by" character varying NOT NULL DEFAULT 'SYSTEM', "updated_by" character varying NOT NULL DEFAULT 'SYSTEM', "ref_id" bigint, "name" character varying(100) NOT NULL, "type" "public"."regency_enum" NOT NULL DEFAULT 'KABUPATEN', "province_id" uuid NOT NULL, CONSTRAINT "PK_175bbbdff7f44ae0d4e33d3b747" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "provinces" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "created_by" character varying NOT NULL DEFAULT 'SYSTEM', "updated_by" character varying NOT NULL DEFAULT 'SYSTEM', "ref_id" bigint, "name" character varying(100) NOT NULL, CONSTRAINT "PK_2e4260eedbcad036ec53222e0c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "regions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "created_by" character varying NOT NULL DEFAULT 'SYSTEM', "updated_by" character varying NOT NULL DEFAULT 'SYSTEM', "ref_id" bigint, "name" character varying(100) NOT NULL, CONSTRAINT "PK_4fcd12ed6a046276e2deb08801c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "countries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "created_by" character varying NOT NULL DEFAULT 'SYSTEM', "updated_by" character varying NOT NULL DEFAULT 'SYSTEM', "ref_id" bigint, "name" character varying(100) NOT NULL, "region_id" uuid, CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "local_addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "created_by" character varying NOT NULL DEFAULT 'SYSTEM', "updated_by" character varying NOT NULL DEFAULT 'SYSTEM', "ref_id" bigint, "postal_code" character varying, "full_address" text, "province_id" uuid, "regency_id" uuid, CONSTRAINT "UQ_bc9c615f02c6fe13ed7f8730a46" UNIQUE ("postal_code"), CONSTRAINT "UQ_3ebb6b3e65a1e086b6533a157d8" UNIQUE ("full_address"), CONSTRAINT "PK_0e26fa0e229f509c3c42b06934d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipping_addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "created_by" character varying NOT NULL DEFAULT 'SYSTEM', "updated_by" character varying NOT NULL DEFAULT 'SYSTEM', "ref_id" bigint, "district" character varying(255) NOT NULL, "postal_code" character varying(100) NOT NULL, "full_address" text, CONSTRAINT "PK_cced78984eddbbe24470f226692" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "created_by" character varying NOT NULL DEFAULT 'SYSTEM', "updated_by" character varying NOT NULL DEFAULT 'SYSTEM', "ref_id" bigint, "avatar_url" character varying(255), "user_id" uuid, "local_address_id" uuid, CONSTRAINT "PK_1ec6662219f4605723f1e41b6cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menus" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "created_by" character varying NOT NULL DEFAULT 'SYSTEM', "updated_by" character varying NOT NULL DEFAULT 'SYSTEM', "ref_id" bigint, "name" character varying NOT NULL, "prefix" character varying NOT NULL, CONSTRAINT "PK_3fec3d93327f4538e0cbd4349c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "role_access" ADD CONSTRAINT "UQ_623366541055d501d5bc6909931" UNIQUE ("user_id", "menu_id")`);
        await queryRunner.query(`ALTER TABLE "regencies" ADD CONSTRAINT "FK_2598522e550a5a13e49ab46c6b9" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "countries" ADD CONSTRAINT "FK_dd7e8f883d887a562db72d8e820" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "local_addresses" ADD CONSTRAINT "FK_bd523ee61b0ce6bcfea0c4f554d" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "local_addresses" ADD CONSTRAINT "FK_2d6a22461281024b667662050a8" FOREIGN KEY ("regency_id") REFERENCES "regencies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD CONSTRAINT "FK_6ca9503d77ae39b4b5a6cc3ba88" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD CONSTRAINT "FK_dee0e3539c28faf33f7ee6e6590" FOREIGN KEY ("local_address_id") REFERENCES "local_addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_access" ADD CONSTRAINT "FK_392e56195c227865f2740b9c0b4" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_access" DROP CONSTRAINT "FK_392e56195c227865f2740b9c0b4"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP CONSTRAINT "FK_dee0e3539c28faf33f7ee6e6590"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP CONSTRAINT "FK_6ca9503d77ae39b4b5a6cc3ba88"`);
        await queryRunner.query(`ALTER TABLE "local_addresses" DROP CONSTRAINT "FK_2d6a22461281024b667662050a8"`);
        await queryRunner.query(`ALTER TABLE "local_addresses" DROP CONSTRAINT "FK_bd523ee61b0ce6bcfea0c4f554d"`);
        await queryRunner.query(`ALTER TABLE "countries" DROP CONSTRAINT "FK_dd7e8f883d887a562db72d8e820"`);
        await queryRunner.query(`ALTER TABLE "regencies" DROP CONSTRAINT "FK_2598522e550a5a13e49ab46c6b9"`);
        await queryRunner.query(`ALTER TABLE "role_access" DROP CONSTRAINT "UQ_623366541055d501d5bc6909931"`);
        await queryRunner.query(`DROP TABLE "menus"`);
        await queryRunner.query(`DROP TABLE "user_profiles"`);
        await queryRunner.query(`DROP TABLE "shipping_addresses"`);
        await queryRunner.query(`DROP TABLE "local_addresses"`);
        await queryRunner.query(`DROP TABLE "countries"`);
        await queryRunner.query(`DROP TABLE "regions"`);
        await queryRunner.query(`DROP TABLE "provinces"`);
        await queryRunner.query(`DROP TABLE "regencies"`);
        await queryRunner.query(`DROP TYPE "public"."regency_enum"`);
        await queryRunner.query(`ALTER TABLE "role_access" RENAME COLUMN "menu_id" TO "role_id"`);
        await queryRunner.query(`ALTER TABLE "role_access" ADD CONSTRAINT "UQ_184e87840bd954a1dc4b4810459" UNIQUE ("user_id", "role_id")`);
        await queryRunner.query(`ALTER TABLE "role_access" ADD CONSTRAINT "FK_2f7f67d507a08448012c08be75b" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
