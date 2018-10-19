import * as jwt from 'jsonwebtoken'
import * as expressJwt from 'express-jwt'
import config from '../config'
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { UserModel } from '../models';
import { RequestSignIn, RequestTokenDecoded } from '../interfaces/Requests';
import ErrorManager from './error';
import HProm from './hprom';
import CryptoUtil from './cryptoUtil';

export default class AuthUtil {

  checkToken: RequestHandler

  isAuth: RequestHandler[]

  constructor(public cryptoUtil: CryptoUtil) {
    this.checkToken = expressJwt({ secret: config.JWT_SECRET })
    this.isAuth = [this.decodeToken, this.getFreshUser]
  }

  decodeToken = (req: Request, res: Response, next: NextFunction) => {
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token
    }
  
    this.checkToken(req, res, next)
  }
  
  signToken(id: string) {
    return jwt.sign(
      {_id: id},
      config.JWT_SECRET,
      {expiresIn: config.JWT_EXPIRE}
    )
  }
  
  verifyUser = async (req: RequestSignIn, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    
    if (typeof email === 'string' && typeof password === 'string') {
      const user = await HProm<UserModel>(UserModel
                    .findOne({
                      where: { email }
                    }))
      if (user.success && user.data) {
        const passCompare = this.cryptoUtil.passwordCompare(password, (<UserModel>user.data).password)
        const compare = await HProm<boolean>(passCompare)
        if (compare.success && compare.data) {
          req.user = <UserModel>user.data
          return next()
        } else {
          return next(new ErrorManager(new Error('La password fornita non corrisponde'), 'LOGGABLE'))
        }
      } else {
        return next(new ErrorManager(new Error('Nessun utente con questa email'), 'LOGGABLE'))
      }
    } else {
      return next(new ErrorManager(new Error('Inserire email e password'), 'LOGGABLE'))
    }
  }

  async getFreshUser(req: RequestTokenDecoded, res: Response, next: NextFunction) {
    const uuid = (<{ _id: string }>req.user)._id
    const findUser = await HProm<UserModel>(UserModel.findOne({ where: { uuid } }))
    if (findUser.success && findUser.data) {
      req.user = <UserModel>findUser.data
      return next()
    } else {
      return next(new ErrorManager(new Error(`Nessun utente corrisponde a ${uuid}`), 'LOGGABLE'))
    }
  }

}