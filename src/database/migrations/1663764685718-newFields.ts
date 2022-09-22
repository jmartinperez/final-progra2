import {MigrationInterface, QueryRunner} from "typeorm";

export class newFields1663764685718 implements MigrationInterface {
    name = 'newFields1663764685718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" uuid PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "username", "email", "created_at", "updated_at") SELECT "id", "username", "email", "created_at", "updated_at" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" uuid PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()), "telefono" varchar NOT NULL, "provincia" varchar NOT NULL, "ciudad" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "username", "email", "created_at", "updated_at") SELECT "id", "username", "email", "created_at", "updated_at" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "telefono" varchar NOT NULL, "provincia" varchar NOT NULL, "ciudad" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "username", "email", "created_at", "updated_at", "telefono", "provincia", "ciudad") SELECT "id", "username", "email", "created_at", "updated_at", "telefono", "provincia", "ciudad" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()), "telefono" varchar NOT NULL, "provincia" varchar NOT NULL, "ciudad" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "users"("id", "username", "email", "created_at", "updated_at", "telefono", "provincia", "ciudad") SELECT "id", "username", "email", "created_at", "updated_at", "telefono", "provincia", "ciudad" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`);
        await queryRunner.query(`INSERT INTO "users"("id", "username", "email", "created_at", "updated_at") SELECT "id", "username", "email", "created_at", "updated_at" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "telefone" varchar NOT NULL, "cidade" varchar NOT NULL, "estado" varchar(2) NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`);
        await queryRunner.query(`INSERT INTO "users"("id", "username", "email", "created_at", "updated_at") SELECT "id", "username", "email", "created_at", "updated_at" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
