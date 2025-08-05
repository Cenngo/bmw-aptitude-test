"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("../api"));
const config_1 = __importDefault(require("@/config"));
exports.default = ({ app }) => {
    app.get('/health', (req, res) => {
        res.status(200).end();
    });
    app.head('/health', (req, res) => {
        res.status(200).end();
    });
    if (config_1.default.trustProxy) {
        app.enable('trust proxy');
    }
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(config_1.default.api.prefix, (0, api_1.default)());
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
//# sourceMappingURL=express.js.map