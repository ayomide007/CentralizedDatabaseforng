import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import mongoose from 'mongoose';
import { createClient } from 'redis';
import path from 'path';
import { Sequelize } from 'sequelize-typescript';
// Postgresql Setups
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

//Redis DB Setups

const redisClient = createClient({
 url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
 });

redisClient.on('error', (err) => console.error('❌ Redis Error:', err));
 redisClient.on('connect', () => console.log('✅ Redis connected'));

(async () => {
  try {
    await redisClient.connect();
 } catch (err) {
    console.error('❌ Redis connection failed', err);
  }
 })();

 // MongoDB Setup
console.log('Connecting to MongoDB with:', {
  uri: process.env.MONGODB_URI,
});
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection failed', err));


 export { sequelize, redisClient, mongoose };
