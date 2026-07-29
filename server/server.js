import dotenv from 'dotenv';
import path from 'path';

// Pre-load env variables before importing app components
dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });

import app from './app.js';
import { sequelize } from './models/index.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log('Starting application startup checks...');
    
    // Verify database connection before opening http socket listener
    await sequelize.authenticate();
    console.log('Database connection verified. Port socket ready.');
    
    app.listen(PORT, () => {
      console.log(`========================================================`);
      console.log(`🚀 Chat Widget Platform Server is up and running`);
      console.log(`🔌 Listening address: http://localhost:${PORT}`);
      console.log(`🛡️  Environment:        ${process.env.NODE_ENV || 'development'}`);
      console.log(`========================================================`);
    });
  } catch (error) {
    console.error('FATAL ERROR: Could not connect to the database on boot.');
    console.error(error.message);
    process.exit(1);
  }
}

startServer();
