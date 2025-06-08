import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import { randomUUID } from "crypto";
import { BadRequestError } from "../errors/bad-request";
import { InternalServerError } from "../errors/internal";


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

export async function postOrder (req: Request, res: Response, next: NextFunction) {
  const order: IOrder = req.body;
  let price = 0;

  for (let item of order.items) {
    try {
      const dbItem = await Product.findById(item, {price: 1, _id: 1});
      if (!dbItem) {
        return next(new BadRequestError(`Товар с id ${item} не найден`))
      }
      if (!dbItem.price) {
        return next(new BadRequestError(`Товар с id ${item} бесценен`));
      }
      price += dbItem.price;
    }
    catch (error) {
      console.log(error)
      return next(new InternalServerError());
    }
  }

  if (price !== order.total) {
      return next(new BadRequestError('Неверная стоимость заказа'));
  }

  res.status(200).send({
    id: randomUUID(),
    total: order.total
  })
}