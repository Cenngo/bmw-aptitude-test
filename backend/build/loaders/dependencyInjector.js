"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const logger_1 = __importDefault(require("./logger"));
const prisma_1 = __importDefault(require("./prisma"));
exports.default = ({ models }) => {
    try {
        models.forEach(model => {
            typedi_1.Container.set(model.name, model.model);
        });
        typedi_1.Container.set('logger', logger_1.default);
        typedi_1.Container.set('prisma', prisma_1.default);
        logger_1.default.info('Dependency Injector loaded successfully');
    }
    catch (e) {
        logger_1.default.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};
//# sourceMappingURL=dependencyInjector.js.map