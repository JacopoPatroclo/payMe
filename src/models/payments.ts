import {
  Table,
  Column,
  Model,
  IsEmail,
  AllowNull,
  IsNumeric
} from 'sequelize-typescript';

@Table
export default class Payments extends Model<Payments> {
  @AllowNull(true)
  @IsEmail
  @Column
  email: string;

  @AllowNull(false)
  @Column
  id_pagamento: string;

  @AllowNull(false)
  @IsNumeric
  @Column
  pagato: number;

  @AllowNull(false)
  @Column
  nome: string;
}
