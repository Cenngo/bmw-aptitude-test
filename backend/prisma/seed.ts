import { PrismaClient } from './generated/prisma';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

function csvToCar(row: any) {
    return {
        brand: row.Brand.trim(),
        model: row.Model.trim(),
        accelSec: parseFloat(row.AccelSec),
        topSpeedKmh: parseInt(row.TopSpeed_KmH),
        rangeKm: parseInt(row.Range_Km),
        efficiencyWhKm: parseInt(row.Efficiency_WhKm),
        fastChargeKmH: row.FastCharge_KmH !== '-' ? parseInt(row.FastCharge_KmH) : null,
        rapidCharge: row.RapidCharge.trim().toLowerCase() === 'yes',
        powerTrain: row.PowerTrain.trim(),
        plugType: row.PlugType.trim(),
        bodyType: row.BodyStyle.trim(),
        segment: row.Segment.trim(),
        seats: parseInt(row.Seats),
        priceEuro: parseInt(row.PriceEuro),
        date: new Date(row.Date)
    };
}

async function main() {
    const csvPath = path.join('./prisma', 'BMW_Aptitude_Test_Test_Data_ElectricCarData.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const records = parse(csvContent, { columns: true, skip_empty_lines: true });
    const cars = records.map(csvToCar);

    console.log(`Seeding ${cars.length} cars...`);

    try {
        await prisma.car.createMany({data: cars, skipDuplicates: true});
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }

    await prisma.$disconnect();
    console.log(`Seeded ${cars.length} cars.`);
}

main()