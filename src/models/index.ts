import {Sequelize} from 'sequelize-typescript';
import config from '../config'

// Importo i vari model
import UserModel from './user';

export const sequelize = new Sequelize({
  host: config.DB_URI,
  database: config.DB_NAME,
  username: config.DB_USER,
  password: config.DB_PASS,
  port: config.DB_PORT,
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false
})

sequelize.addModels([
  UserModel
])

export {
  UserModel
}