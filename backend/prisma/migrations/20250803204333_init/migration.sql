-- CreateTable
CREATE TABLE `Car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brand` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `AccelSec` DOUBLE NOT NULL,
    `TopSpeedKmh` INTEGER NOT NULL,
    `RangeKm` INTEGER NOT NULL,
    `EfficiencyWhKm` INTEGER NOT NULL,
    `FastCharge_KmH` INTEGER NOT NULL,
    `RapidCharge` BOOLEAN NOT NULL,
    `PowerTrain` ENUM('AWD', 'FWD', 'RWD') NOT NULL,
    `PlugType` VARCHAR(191) NOT NULL,
    `BodyType` VARCHAR(191) NOT NULL,
    `Segment` ENUM('D', 'C', 'B', 'A', 'F', 'N', 'E') NOT NULL,
    `Seats` INTEGER NOT NULL,
    `PriceEuro` INTEGER NOT NULL,
    `Date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
