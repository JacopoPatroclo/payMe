import * as bcrypt from 'bcrypt'
import {
  Table,
  Column,
  Model,
  BeforeCreate,
  BeforeUpdate,
  BeforeBulkCreate,
  IsEmail,
  PrimaryKey,
  IsUUID,
  Default,
  Sequelize,
  Unique,
  AllowNull,
  Length
} from 'sequelize-typescript'

@Table
export default class User extends Model<User> {
 
  @IsUUID(4)
  @PrimaryKey
  @Default(Sequelize.UUIDV4)
  @Column
  uuid: string

  @IsEmail
  @Unique
  @Column
  email: string
 
  @AllowNull(false)
  @Length({
    min: 6,
    max: 20,
    msg: 'La password deve essere lunga almeno 6 caratteri'
  })
  @Column
  password: string

  @BeforeUpdate
  @BeforeCreate
  @BeforeBulkCreate
  static encryptPassword(instance: User) {
    if (instance.password) {
      return bcrypt.hash(instance.password, 10)
        .then(hash => {
          instance.password = hash
          return true
        })
    } else {
      return true
    }
  }
}