/*
  Warnings:

  - You are about to drop the column `idFile` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `idfile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idFileUrl` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "idfile" DROP CONSTRAINT "idfile_user_id_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "idFile",
ADD COLUMN     "idFileUrl" VARCHAR(200) NOT NULL,
ALTER COLUMN "idNum" SET DATA TYPE BIGINT;

-- DropTable
DROP TABLE "idfile";
