import { sequelize } from '../models/index.js';

async function verifyConnection() {
  try {
    console.log('Testing connection to MySQL database via Sequelize connection pool...');
    await sequelize.authenticate();
    console.log('================================================================');
    console.log('SUCCESS: Database connection has been established successfully.');
    console.log(`Database Dialect: ${sequelize.getDialect()}`);
    console.log(`Database Target:  ${sequelize.config.database}`);
    console.log(`Host Profile:     ${sequelize.config.host}:${sequelize.config.port}`);
    console.log('================================================================');
    process.exit(0);
  } catch (error) {
    console.error('================================================================');
    console.error('FAILURE: Unable to connect to the database:');
    console.error(error.message);
    console.error('Please ensure MySQL server is running and database configuration in .env is valid.');
    console.error('================================================================');
    process.exit(1);
  }
}

verifyConnection();
