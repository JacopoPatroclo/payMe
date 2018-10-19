import { Router } from 'express'
import AuthController from './AuthController';
import AuthUtil from '../lib/auth';

export default class AuthRouter {

  router: Router

  constructor(
    public controller: AuthController,
    public authHelper: AuthUtil
    ) {
    this.router = Router()
    this.params()
    this.routing()
  }

  params() {}

  routing() {
    this.router.post('/signin', this.authHelper.verifyUser, this.controller.signIn)
  }

}