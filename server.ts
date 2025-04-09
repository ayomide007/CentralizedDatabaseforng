// import express from 'express';
// import { sequelize } from './database';
// import authRoutes from './routes/authRoutes';

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);

// // Connect DB and start server
// sequelize.sync({ alter: true }).then(() => {
//   console.log('📦 Database synced successfully.');
//   app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
// }).catch((err) => {
//   console.error('❌ Unable to connect to the database:', err);
// });
