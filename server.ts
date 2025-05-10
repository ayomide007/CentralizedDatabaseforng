import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/db'; // Sequelize instance
import { redisClient } from './config/db';
import { mongoose } from './config/db'; // MongoDB instance
import authRoutes from './routes/authRoutes';

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Server startup logic
const startServer = async () => {
  try {
    // Connect to PostgreSQL
    await sequelize.authenticate();
    console.log('📦 Database connection authenticated successfully (PostgreSQL).');

    // Connect to Redis
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log('✅ Redis connected successfully.');
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('✅ MongoDB connected successfully.');

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect:', error);
    process.exit(1);
  }
};

startServer();
