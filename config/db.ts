import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/userModel';

// Create a Sequelize instance using individual properties
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.HOST, // Your host
  username: process.env.POSTGRESQL_USERNAME, // Your database username
  password: process.env.POSTGRESQL_PASSWORD, // Your database password
  database: process.env.DATABASENAME, // Your database name
  port: Number(process.env.PORT) || 5432, // PostgreSQL default port
  models: [__dirname + '/models'], // Path to your models
  pool: {
    max: 10,         // maximum number of connections
    min: 0,          // minimum number of connections
    acquire: 30000,  // max time in ms to try getting a connection before throwing error
    idle: 10000      // time in ms before releasing an idle connection
  },
  logging: false
});

export default sequelize;
