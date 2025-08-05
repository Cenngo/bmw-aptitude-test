import express from 'express';
import cors from 'cors';
import routes from '../api';
import config from '@/config';
import middlewares from '@/api/middlewares';

export default ({app}: {app: express.Application}) => {
    app.get('/health', (req, res) => {
        res.status(200).end();
    });

    app.head('/health', (req, res) => {
        res.status(200).end();
    });

    if(config.trustProxy) {
        app.enable('trust proxy');
    }

    app.use(cors());

    app.use(middlewares.serviceScope);

    app.use(express.json());
    app.use(config.api.prefix, routes());

    //add documentation

    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    app.use((err, req, res, next) => {
        return next(err);
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message
            }
        });
    });
};