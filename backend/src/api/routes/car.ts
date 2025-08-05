import { Filter, ICarFilter } from '@/interfaces/filter';
import { ISortModelItem } from '@/interfaces/sort';
import CarService from '@/services/car';
import { resolveResult } from '@/utils/response';
import { Router, Request, Response } from 'express';

const route = Router();

export default (app: Router) => {
    app.use('/cars', route);

    route.get('/', async (req: Request, res: Response) => {
        const start = parseInt(req.query.start as string, 10) || 0;
        const end = parseInt(req.query.end as string, 10) || 10;
        const filter: ICarFilter = JSON.parse(req.query.filterModel as string);
        const sort: ISortModelItem[] = JSON.parse(req.query.sortModel as string) || [];
        const search: string = req.query.search as string || '';

        const carService = req.serviceScope.resolve(CarService);  
        const carsResult = await carService.getCars({start, end, filter, sort, search});
        
        resolveResult(carsResult, res);
    });

    route.get('/:id', async (req: Request, res: Response) => {
        const carService = req.serviceScope.resolve(CarService);
        const carResult = await carService.getCarById(parseInt(req.params.id));
        
        resolveResult(carResult, res);
    });

    route.delete('/:id', async (req: Request, res: Response) => {
        const carService = req.serviceScope.resolve(CarService);
        const deleteResult = await carService.deleteCarById(parseInt(req.params.id));

        resolveResult(deleteResult, res);
    });
};