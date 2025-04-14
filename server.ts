import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db'; // Sequelize instance (without sync)

dotenv.config(); // Load env variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes (Example)
import authRoutes from './routes/authRoutes';
app.use('/api/auth', authRoutes);

// Start the server
const startServer = async () => {
  try {
    // Just authenticate the DB connection
    await sequelize.authenticate();
    console.log('📦 Database connection authenticated successfully.');

    // ⛔ DO NOT sync() the DB when using migrations
    // await sequelize.sync(); ← remove this line

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Failed to connect to database:', error);
    process.exit(1);
  }
};

startServer();
