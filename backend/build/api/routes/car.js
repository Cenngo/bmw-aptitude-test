"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/cars', route);
    route.get('/', (req, res) => {
    });
};
//# sourceMappingURL=car.js.map