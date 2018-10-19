import { Router } from 'express'

// importo i router
import UserRouter from './user/UserRouter'

export default class Api {

  router: Router

  constructor(public userRouter: UserRouter) {
    this.router = Router()
    this.routing()
  }

  routing() {
    this.router.use('/user', this.userRouter.router)
  }
}