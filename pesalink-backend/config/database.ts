// pesalink-backend/src/config/database.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];

let sequelize: Sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]!, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Function to test the connection
export const testDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully. ✅');
    } catch (error) {
        console.error('Unable to connect to the database: ❌', error);
    }
};

export { sequelize };