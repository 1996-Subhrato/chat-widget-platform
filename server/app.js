import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { sequelize } from './models/index.js';

import authRoutes from './routes/authRoutes.js';

const app = express();

// Security foundation middleware
app.use(helmet());

// Configure CORS for React client origin
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request parsing middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan request logging middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health Check Endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Dynamically test the database connection
    await sequelize.authenticate();
    return res.status(200).json({
      status: 'ok',
      database: 'connected'
    });
  } catch (error) {
    console.error('[Health Check DB Connection Failure]:', error.message);
    return res.status(503).json({
      status: 'error',
      database: 'disconnected',
      details: process.env.NODE_ENV === 'production' ? 'Unavailable' : error.message
    });
  }
});

// Authentication API Routes
app.use('/api/auth', authRoutes);

// Centralized 404 Route Handler
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Resource Not Found: ${req.method} ${req.originalUrl}`);
  next(error);
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const isProd = process.env.NODE_ENV === 'production';
  
  // Mask internal database/Sequelize details
  let message = err.message || 'Internal Server Error';
  if (err.name && err.name.includes('Sequelize')) {
    message = 'A database error occurred';
  }

  res.status(statusCode).json({
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: message
    }
  });
});

export default app;
