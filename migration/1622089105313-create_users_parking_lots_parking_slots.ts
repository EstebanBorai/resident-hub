import {MigrationInterface, QueryRunner} from "typeorm";

export class createUsersParkingLotsParkingSlots1622089105313 implements MigrationInterface {
    name = 'createUsersParkingLotsParkingSlots1622089105313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "parking_slots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "parkingLotIdId" uuid, CONSTRAINT "PK_5250ec7083edc7c3491b72a0a50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parking_lots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), CONSTRAINT "PK_27af37fbf2f9f525c1db6c20a48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(254) NOT NULL, "password" character varying(60) NOT NULL, "role" "users_role_enum" NOT NULL DEFAULT 'user', "refresh_token" character varying(512), "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "parking_slots" ADD CONSTRAINT "FK_2de7e435a4b42e28acf9590eb6c" FOREIGN KEY ("parkingLotIdId") REFERENCES "parking_lots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parking_slots" DROP CONSTRAINT "FK_2de7e435a4b42e28acf9590eb6c"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "parking_lots"`);
        await queryRunner.query(`DROP TABLE "parking_slots"`);
    }

}
