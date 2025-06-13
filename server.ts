import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './config/db'; // Sequelize instance
import { redisClient } from './config/db';
import { mongoose } from './config/db'; // MongoDB instance
import authRoutes from './routes/authRoutes';
import swaggerUi from 'swagger-ui-express';
const swaggerJsdoc = require('swagger-jsdoc');
import { swaggerOptions } from "./config/swaggerOptions";

dotenv.config();

const app: Application = express();
const PORT = process.env.SERVER_PORT || 4000;

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// ========== MIDDLEWARE ==========
app.use(cors());
app.use(express.json());

// ========== SWAGGER DOCS ==========
app.get('/api-docs/swagger.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(undefined, {
  swaggerUrl: '/api-docs/swagger.json',
}));

// ========== HEALTH CHECK ==========
// app.get('/health', (_req, res) => res.send('OK'));

// ========== ROOT ROUTE ==========
app.get('/', (_req, res) => {
  res.send('🚀 Server is up and running');
});

// ========== API ROUTES ==========
app.use('/api/auth', authRoutes);

// ========== START SERVER ==========
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('📦 PostgreSQL Database connection authenticated successfully.');

    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log('✅ Redis connected successfully.');
    }

    // await mongoose.connect(process.env.MONGODB_URI as string);
    // console.log('✅ MongoDB connected successfully.');

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📘 Swagger docs at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('❌ Failed to connect:', error);
    process.exit(1);
  }
};

startServer();
