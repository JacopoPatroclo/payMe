import { Request } from 'express'
import { UserModel } from '../models';

export interface RequestParamId extends Request {
  params: {
    uuid: string
  }
}

export interface RequestUser extends Request {
  body: UserModel
}

export interface RequestSignIn extends Request {
  body: {
    email?: string,
    password?: string
  },
  user?: UserModel
}

export interface RequestTokenDecoded extends Request {
  user: UserModel | {
    _id: string
  }
}