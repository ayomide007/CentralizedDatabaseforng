"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const path_1 = __importDefault(require("path"));
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'your_pg_user',
    password: process.env.POSTGRES_PASSWORD,
    database: 'your_db_name',
    models: [path_1.default.join(__dirname, '/models')] // auto-load models
});
