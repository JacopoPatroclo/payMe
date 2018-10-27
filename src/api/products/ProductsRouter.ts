import { Router } from 'express';
import ProductsController from './ProductsController';

export default class ProductsRouter {
  router: Router;

  constructor(public controller: ProductsController) {
    this.router = Router();
    this.params();
    this.routing();
  }

  params() {}

  routing() {
    this.router.get('/', this.controller.get);
    this.router.get('/success/:price/:name', this.controller.successPayPal);
    this.router.post('/pay/stripe/:price/:name', this.controller.payStripe);
    this.router.post('/pay/paypal/:price/:name', this.controller.payPayPal);
  }
}
