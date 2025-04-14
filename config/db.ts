import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import { Sequelize } from 'sequelize-typescript';

console.log('Connecting to DB with:', {
  user: process.env.POSTGRES_USER,
  pass: process.env.POSTGRES_PASSWORD,
  db: process.env.POSTGRES_DB,
  host: process.env.HOST,
  port: process.env.POSTGRES_PORT,
});

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.HOST || 'localhost',
  username: process.env.POSTGRES_USER,  // Use correct env variable here
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  models: [__dirname + '/models'],
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
});

export default sequelize;
