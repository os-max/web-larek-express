import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request';
import InternalServerError from '../errors/internal';

enum paymentType {
  'card',
  'online'
}

interface IOrder {
  payment: paymentType,
  email: string,
  phone: string,
  adress: string,
  total: number,
  items: [string]
}

export default function createOrder(req: Request, res: Response, next: NextFunction) {
  const order: IOrder = req.body;
  let price = 0;

  const promises = order.items.map((item) => Product.findById(item, { _id: 1, price: 1 }));

  Promise.all(promises)
    .then((items) => {
      /* eslint-disable-next-line */
      for (const item of items) {
        if (!item) {
          next(new BadRequestError('Товар не найден'));
          return;
        }
        if (!item.price) {
          next(new BadRequestError(`Товар с id ${item} бесценен`));
          return;
        }
        price += item.price;
      }

      if (price !== order.total) {
        next(new BadRequestError('Неверная стоимость заказа'));
        return;
      }

      res.status(200).send({
        id: randomUUID(),
        total: order.total,
      });
    })
    .catch((error) => next(new InternalServerError(error)));
}
