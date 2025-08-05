import 'reflect-metadata';
import config from './config';
import express from 'express';
import Logger from './loaders/logger';
import loaders from './loaders';

async function startServer() {
    const app = express();

    loaders({ expressApp: app });

    app.listen(config.port, () => {
        Logger.info(`Express server is running on port ${config.port}`);
    })
    .on('error', err => {
        Logger.error(err);
        process.exit(1);
    });
}

startServer();