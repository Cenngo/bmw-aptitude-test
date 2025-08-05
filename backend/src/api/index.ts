import { Router } from 'express';
import cars from './routes/car';

export default () => {
    const app = Router();

    cars(app);

    return app;
}