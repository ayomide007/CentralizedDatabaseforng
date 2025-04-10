import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost', // Your host
  username: 'yourUsername', // Your database username
  password: 'yourPassword', // Your database password
  database: 'yourDatabaseName',
  models: [__dirname + '/models'], // Path to your models
});

export default sequelize;
