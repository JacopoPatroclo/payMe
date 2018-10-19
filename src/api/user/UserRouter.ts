import UserController from "./UserController";
import { Router } from "express";
import AuthUtil from "../../lib/auth";

export default class User {

  router: Router

  constructor(
    public controller: UserController,
    public authUtil: AuthUtil
    ) {

    this.router = Router()
    this.params()
    this.routing()

  }

  params() {
    this.router.param('uuid', this.controller.uuid)
  }

  routing() {
    this.router.get('/:uuid', this.authUtil.isAuth, this.controller.get)
    this.router.post('/', this.controller.create)
  }

}