-- CreateTable
CREATE TABLE `chama` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `description` TEXT NOT NULL,
    `location` VARCHAR(200) NOT NULL,
    `address` VARCHAR(150) NOT NULL,
    `certificate` VARCHAR(150) NULL,
    `date_created` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `name_UNIQUE`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sacco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(50) NOT NULL,
    `othernames` VARCHAR(50) NOT NULL,
    `gender` VARCHAR(50) NOT NULL,
    `dob` DATE NOT NULL,
    `idNum` INTEGER NOT NULL,
    `idFile` BLOB NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `phone1` VARCHAR(50) NOT NULL,
    `phone2` VARCHAR(45) NULL,
    `password` VARCHAR(200) NOT NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `isAdmin` TINYINT NULL,
    `deleted` INTEGER NULL DEFAULT 0,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `idNum_UNIQUE`(`idNum`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `idfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `size` INTEGER NOT NULL,
    `type` VARCHAR(100) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `lastModified` DATETIME(0) NOT NULL,

    INDEX `fk_idfile_user1_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_has_chama` (
    `user_id` INTEGER NOT NULL,
    `chama_id` INTEGER NOT NULL,
    `status` VARCHAR(45) NOT NULL,
    `wallet_id` VARCHAR(45) NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `update_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_user_has_chama_chama1_idx`(`chama_id`),
    INDEX `fk_user_has_chama_user1_idx`(`user_id`),
    PRIMARY KEY (`user_id`, `chama_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `idfile` ADD CONSTRAINT `fk_idfile_user1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_has_chama` ADD CONSTRAINT `fk_user_has_chama_chama1` FOREIGN KEY (`chama_id`) REFERENCES `chama`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_has_chama` ADD CONSTRAINT `fk_user_has_chama_user1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
