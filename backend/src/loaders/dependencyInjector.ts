import { container } from 'tsyringe';
import LoggerInstance from './logger';
import PrismaInstance from './prisma';
import {PrismaClient} from 'prisma/generated/prisma';
import { Logger } from 'winston';
import CarService from '@/services/car';

export default () => {
    try {
        container.registerInstance(Logger, LoggerInstance);
        container.registerInstance(PrismaClient, PrismaInstance);

        container.register<CarService>(CarService, {useValue: new CarService(LoggerInstance, PrismaInstance)});

        LoggerInstance.info('Dependency Injector loaded successfully');
    } catch (e) {
        LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};