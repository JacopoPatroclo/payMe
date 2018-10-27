import { Router } from 'express';

// importo i router
import UserRouter from './user/UserRouter';
import ProductsRouter from './products/ProductsRouter';

export default class Api {
  router: Router;

  constructor(
    public userRouter: UserRouter,
    public productsRouter: ProductsRouter
  ) {
    this.router = Router();
    this.routing();
  }

  routing() {
    this.router.use('/user', this.userRouter.router);
    this.router.use('/products', this.productsRouter.router);
  }
}
