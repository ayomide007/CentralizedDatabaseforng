"use strict";
// import { Sequelize } from 'sequelize-typescript';
// import path from 'path';
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
// export const sequelize = new Sequelize({
//   dialect: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'your_pg_user',
//   password: process.env.POSTGRES_PASSWORD,
//   database: 'your_db_name',
//   models: [path.join(__dirname, '/models')]  // auto-load models
// });
const sequelize_typescript_1 = require("sequelize-typescript");
const userModel_1 = require("../models/userModel");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'centraldb',
    models: [userModel_1.User],
});
