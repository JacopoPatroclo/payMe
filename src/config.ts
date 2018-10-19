import * as dotenv from 'dotenv'
import Configuration from './interfaces/Configuration'

dotenv.config()
let configObject: Configuration;

if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
  // production configuration object
  configObject = {
    PORT: process.env.PORT || 3001,
    ENVIROMENT: 'Production',
    DB_PASS: process.env.DB_PASS,
    DB_PORT: Number(process.env.DB_PORT),
    DB_URI: process.env.DB_URI,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE
  }
} else {
  // development configuration object
  configObject = {
    PORT: process.env.PORT || 3000,
    ENVIROMENT: 'Development',
    DB_PASS: process.env.DB_PASS,
    DB_PORT: Number(process.env.DB_PORT),
    DB_URI: process.env.DB_URI,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: 'Development secret is for boyz...',
    JWT_EXPIRE: '1h'
  }
}

export default configObject;