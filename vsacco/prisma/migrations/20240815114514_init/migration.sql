-- CreateTable
CREATE TABLE "chama" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "location" VARCHAR(200) NOT NULL,
    "address" VARCHAR(150) NOT NULL,
    "certificate" VARCHAR(150),
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "chama_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sacco" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,

    CONSTRAINT "sacco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR(50) NOT NULL,
    "othernames" VARCHAR(50) NOT NULL,
    "gender" VARCHAR(50) NOT NULL,
    "dob" DATE NOT NULL,
    "idNum" INTEGER NOT NULL,
    "idFile" VARCHAR(200) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "phone1" VARCHAR(50) NOT NULL,
    "phone2" VARCHAR(45),
    "password" VARCHAR(200) NOT NULL,
    "create_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isAdmin" INTEGER,
    "deleted" INTEGER DEFAULT 0,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "idfile" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "size" INTEGER NOT NULL,
    "type" VARCHAR(100) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "lastModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "idfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_has_chama" (
    "user_id" INTEGER NOT NULL,
    "chama_id" INTEGER NOT NULL,
    "status" VARCHAR(45) NOT NULL,
    "wallet_label" VARCHAR(45),
    "create_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_has_chama_pkey" PRIMARY KEY ("user_id","chama_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chama_id_key" ON "chama"("id");

-- CreateIndex
CREATE UNIQUE INDEX "chama_name_key" ON "chama"("name");

-- CreateIndex
CREATE UNIQUE INDEX "chama_certificate_key" ON "chama"("certificate");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_idNum_key" ON "user"("idNum");

-- CreateIndex
CREATE INDEX "idfile_user_id_idx" ON "idfile"("user_id");

-- CreateIndex
CREATE INDEX "user_has_chama_chama_id_idx" ON "user_has_chama"("chama_id");

-- CreateIndex
CREATE INDEX "user_has_chama_user_id_idx" ON "user_has_chama"("user_id");

-- AddForeignKey
ALTER TABLE "idfile" ADD CONSTRAINT "idfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_has_chama" ADD CONSTRAINT "user_has_chama_chama_id_fkey" FOREIGN KEY ("chama_id") REFERENCES "chama"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_has_chama" ADD CONSTRAINT "user_has_chama_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
