import { Sequelize } from 'sequelize-typescript';
import config from '../config';
import { existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const pathDb = resolve('db');
if (!existsSync(pathDb)) {
  mkdirSync(pathDb);
}

// Importo i vari model
import UserModel from './user';
import PaymentsModel from './payments';

export const sequelize = new Sequelize({
  database: config.DB_NAME,
  username: config.DB_USER,
  password: config.DB_PASS,
  dialect: 'sqlite',
  storage: 'db/db.sqlite',
  operatorsAliases: false,
  logging: false
});

sequelize.addModels([UserModel, PaymentsModel]);

export { UserModel, PaymentsModel };
