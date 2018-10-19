import * as bcrypt from 'bcrypt'

export default class CryptoUtil {

  constructor(public saltRounds: number) {}

  encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds)
  }

  passwordCompare(passwordPlane: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(passwordPlane, passwordHash)
  }

}