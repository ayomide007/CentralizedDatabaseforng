// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '../.env') }); // Go one level up from 'util' folder

// import { Sequelize } from 'sequelize';

// console.log('🔍 Connecting to DB with:', {
//   user: process.env.POSTGRES_USER,
//   pass: process.env.POSTGRES_PASSWORD,
//   db: process.env.POSTGRES_DB,
//   host: process.env.POSTGRES_HOST || 'localhost',
//   port: process.env.POSTGRES_PORT,
// });

// // PostgreSQL connection details
// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   host: process.env.POSTGRES_HOST || 'localhost',
//   port: Number(process.env.POSTGRES_PORT) || 5432,
//   username: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DB,
// });

// // Test the connection
// const testConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('📦 Database connected successfully!');
//   } catch (error) {
//     console.error('❌ Database connection failed:', error);
//   }
// };

// testConnection();