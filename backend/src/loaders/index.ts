import expressLoader from './express';
import Logger from './logger';
import dependencyInjectorLoader from './dependencyInjector';

export default async({expressApp}) => {
    await expressLoader({app: expressApp});
    Logger.info('Express loaded');

    await dependencyInjectorLoader();
    Logger.info('Services registered to the service container');
};