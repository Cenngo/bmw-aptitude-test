import { container } from "tsyringe"
import { Logger } from "winston"

const serviceScope = async (req, res, next) => {
    const logger: Logger = container.resolve(Logger);

    try {
        const serviceContainer = container.createChildContainer();
    
        req.serviceScope = serviceContainer;
        return next();
    } catch (err) {
        logger.error("Error creating service scope: %o", err);
        return next(err);
    }
}

export default serviceScope;