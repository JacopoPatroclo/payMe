import Logger from '../lib/logger';
import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models';
import { RequestSignIn } from '../interfaces/Requests';
import AuthUtil from '../lib/auth';

export default class AuthController {

  constructor(
    public logger: Logger,
    public authHelper: AuthUtil
    ) {}

  signIn = (req: RequestSignIn, res: Response, next: NextFunction) => {
    const token = this.authHelper.signToken(req.user.uuid)
    res.json({ token })
  }

}