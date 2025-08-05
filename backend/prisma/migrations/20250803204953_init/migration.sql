/*
  Warnings:

  - You are about to drop the column `AccelSec` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `BodyType` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `Date` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `EfficiencyWhKm` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `FastCharge_KmH` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `PlugType` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `PowerTrain` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `PriceEuro` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `RangeKm` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `RapidCharge` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `Seats` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `Segment` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `TopSpeedKmh` on the `Car` table. All the data in the column will be lost.
  - Added the required column `accelSec` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bodyType` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `efficiencyWhKm` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plugType` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `powerTrain` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceEuro` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rangeKm` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rapidCharge` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seats` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `segment` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topSpeedKmh` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Car` DROP COLUMN `AccelSec`,
    DROP COLUMN `BodyType`,
    DROP COLUMN `Date`,
    DROP COLUMN `EfficiencyWhKm`,
    DROP COLUMN `FastCharge_KmH`,
    DROP COLUMN `PlugType`,
    DROP COLUMN `PowerTrain`,
    DROP COLUMN `PriceEuro`,
    DROP COLUMN `RangeKm`,
    DROP COLUMN `RapidCharge`,
    DROP COLUMN `Seats`,
    DROP COLUMN `Segment`,
    DROP COLUMN `TopSpeedKmh`,
    ADD COLUMN `accelSec` DOUBLE NOT NULL,
    ADD COLUMN `bodyType` VARCHAR(191) NOT NULL,
    ADD COLUMN `date` DATETIME(3) NOT NULL,
    ADD COLUMN `efficiencyWhKm` INTEGER NOT NULL,
    ADD COLUMN `fastChargeKmH` INTEGER NULL,
    ADD COLUMN `plugType` VARCHAR(191) NOT NULL,
    ADD COLUMN `powerTrain` ENUM('AWD', 'FWD', 'RWD') NOT NULL,
    ADD COLUMN `priceEuro` INTEGER NOT NULL,
    ADD COLUMN `rangeKm` INTEGER NOT NULL,
    ADD COLUMN `rapidCharge` BOOLEAN NOT NULL,
    ADD COLUMN `seats` INTEGER NOT NULL,
    ADD COLUMN `segment` VARCHAR(191) NOT NULL,
    ADD COLUMN `topSpeedKmh` INTEGER NOT NULL;
