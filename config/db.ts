import { Sequelize } from 'sequelize-typescript';
import path from 'path';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your_pg_user',
  password: process.env.POSTGRES_PASSWORD,
  database: 'your_db_name',
  models: [path.join(__dirname, '/models')]  // auto-load models
});