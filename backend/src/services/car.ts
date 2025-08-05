import { Logger } from 'winston';
import { IPaginatedData, IResult } from '@/interfaces/result.js';
import ICar from '@/interfaces/car.js';
import { PowerTrain, Prisma, PrismaClient } from 'prisma/generated/prisma';
import { injectable } from 'tsyringe';
import { notFoundResult, successResult } from '@/utils/result';
import { dateFilter, floatFilter, stringFilter } from '@/utils/filter';
import { ICarFilter } from '@/interfaces/filter';
import { ISortModelItem } from '@/interfaces/sort';

@injectable()
export default class CarService {
    constructor(
        public logger: Logger,
        public prisma: PrismaClient
    ){}

    async getCars({start, end, filter, sort, search}: {start: number, end: number, filter: ICarFilter, sort: ISortModelItem[], search: string}): Promise<IResult<IPaginatedData<ICar>>> {
        const whereCondition: Prisma.CarWhereInput = {
            brand: filter.brand ? stringFilter(filter.brand) : undefined,
            model: filter.model ? stringFilter(filter.model) : undefined,
            accelSec: filter.accelSec ? floatFilter(filter.accelSec) : undefined,
            topSpeedKmh: filter.topSpeedKmh ? floatFilter(filter.topSpeedKmh) : undefined,
            rangeKm: filter.rangeKm ? floatFilter(filter.rangeKm) : undefined,
            efficiencyWhKm: filter.efficiencyWhKm ? floatFilter(filter.efficiencyWhKm) : undefined,
            fastChargeKmH: filter.fastChargeKmH ? floatFilter(filter.fastChargeKmH) : undefined,
            rapidCharge: filter.rapidCharge ? { equals: filter.rapidCharge.filter === 'yes' } : undefined,
            powerTrain: {
                equals: filter.powerTrain ? <PowerTrain>filter.powerTrain.filter : undefined,
            },
            plugType: filter.plugType ? stringFilter(filter.plugType) : undefined,
            bodyType: filter.bodyType ? stringFilter(filter.bodyType) : undefined,
            segment: filter.segment ? stringFilter(filter.segment) : undefined,
            seats: filter.seats ? floatFilter(filter.seats) : undefined,
            priceEuro: filter.priceEuro ? floatFilter(filter.priceEuro) : undefined,
            date: filter.date ? dateFilter(filter.date) : undefined,
            AND: [
                {OR: [
                    {brand: {contains: search}},
                    {model: {contains: search}},
                ]},
            ]
        }
        
        const orderBy: Prisma.CarOrderByWithRelationInput = Object.fromEntries(
            sort.map((item) => {
                return [
                    item.colId,
                    item.sort
                ]
            })
        );

        const [cars, count] = await this.prisma.$transaction([
            this.prisma.car.findMany({
                take: end-start+1,
                skip: start,
                where: whereCondition,
                orderBy: orderBy
            }),
            this.prisma.car.count({
                where: whereCondition
            })
        ]);

        return successResult({
            items: cars,
            totalCount: count,
            start,
            end
        });
    }

    async getCarById(id: number): Promise<IResult<ICar>> {
        const car = await this.prisma.car.findUnique({
            where: {id: id}
        });

        if(!car) {
            return notFoundResult('car');
        }

        return successResult(car);
    }

    async deleteCarById(id: number): Promise<IResult<void>> {
        const car = await this.prisma.car.findUnique({
            where: {id: id}
        });

        if(!car) {
            return notFoundResult('car');
        }

        await this.prisma.car.delete({
            where: {id: id}
        });

        return successResult<void>(undefined);
    }
}   