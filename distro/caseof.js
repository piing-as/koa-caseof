"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_get_1 = __importDefault(require("lodash.get"));
exports.default = (on, cases) => async (ctx, next) => {
    const key = lodash_get_1.default(ctx, on);
    const matched = cases[key];
    if (!matched)
        return await next();
    return await matched(ctx, next);
};
