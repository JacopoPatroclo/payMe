import { Request, Response, NextFunction } from 'express';
import Logger from '../../lib/logger';
import TicketsManager from '../../lib/tickets';
import { PaymentsModel } from '../../models';
import * as stripe from 'stripe';
import config from '../../config';
import * as paypal from 'paypal-rest-sdk';

paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id: config.PAYPAL_CLIENT_ID,
  client_secret: config.PAYPAL_SECRET
});

export default class ProductsController {
  stripe: any;
  constructor(public logger: Logger, public ticketList: TicketsManager) {
    this.stripe = stripe(config.STRIPE_SK);
  }

  get = (req: Request, res: Response, next: NextFunction) => {
    res.render('products', {
      tickets: this.ticketList.getAll(),
      stripe_pk: config.STRIPE_PK
    });
  };

  payStripe = async (req: Request, res: Response, next: NextFunction) => {
    const charges = await this.stripe.charges.create({
      amount: req.params.price,
      currency: 'eur',
      source: req.body.stripeToken,
      description: `Pagamento effettuato per ${req.params.name}`
    });
    await PaymentsModel.create({
      email: req.body.stripeEmail,
      nome: req.params.name,
      id_pagamento: charges.id,
      pagato: charges.amount
    });
    res.render('success');
  };

  payPayPal = async (req: Request, res: Response, next: NextFunction) => {
    let create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: `http://localhost:4001/api/v1/products/success/${req.params
          .price / 100}/${req.params.name}`,
        cancel_url: 'http://localhost:4001/api/v1/products'
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: req.params.name,
                sku: req.params.name,
                price: req.params.price / 100,
                currency: 'EUR',
                quantity: 1
              }
            ]
          },
          amount: {
            currency: 'EUR',
            total: req.params.price / 100
          },
          description: `Pagamento effettuato per ${req.params.name}`
        }
      ]
    };

    paypal.payment.create(create_payment_json, function(error, payment) {
      if (error) {
        throw error;
      } else {
        for (let index = 0; index < payment.links.length; index++) {
          if (payment.links[index].rel === 'approval_url') {
            res.redirect(payment.links[index].href);
          }
        }
      }
    });
  };

  successPayPal = async (req: Request, res: Response, next: NextFunction) => {
    await PaymentsModel.create({
      nome: req.params.name,
      id_pagamento: req.query.paymentId,
      pagato: req.params.price
    });
    res.render('success');
  };

  cancel = (req: Request, res: Response, next: NextFunction) => {};
}
