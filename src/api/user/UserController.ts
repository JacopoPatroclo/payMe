import { Request, Response, NextFunction } from "express";
import { UserModel } from '../../models'
import { RequestParamId, RequestUser } from "../../interfaces/Requests";
import Logger from "../../lib/logger";
import HProm from "../../lib/hprom";
import ErrorManager from "../../lib/error";

export default class UserController {

  constructor(public logger: Logger) {}

  async uuid(req: Request, res: Response, next: NextFunction, uuid: string) {
    req.params.uuid = uuid
    next()
  }

  async create(req: RequestUser, res: Response, next: NextFunction) {
    const userCreation = await HProm<UserModel>(UserModel.create(req.body))
    if (userCreation.success) {
      res.status(201).send()
    } else {
      next(new ErrorManager(<Error>userCreation.data, 'LOGGABLE'))
    }
  }

  async get(req: RequestParamId, res: Response, next: NextFunction) {
    const finduser = await HProm<UserModel>(UserModel.findById(req.params.uuid))
    if(finduser.success && finduser.data) {
      res.status(200).json((<UserModel>finduser.data).dataValues)
    } else {
      next(new ErrorManager(new Error('Nessun utente con questo id'), 'LOGGABLE'))
    }
  }

}