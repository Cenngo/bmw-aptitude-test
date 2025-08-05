import { DependencyContainer } from "tsyringe";

declare global {
    namespace Express {
        export interface Request {
            serviceScope: DependencyContainer;
        }
    }
}