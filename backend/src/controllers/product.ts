import { NextFunction, Request, Response } from 'express';
import Product from '../models/product';
import ConflictError from '../errors/conflict-error';
import BadRequestError from '../errors/bad-request';

export function getProductList(_req: Request, res: Response, next: NextFunction) {
  Product.find({}, { __v: 0 })
    .then((productList) => {
      res.status(200).send({
        items: productList,
        total: productList.length,
      });
    })
    .catch((error) => next(error));
}

export function addProduct(req: Request, res: Response, next: NextFunction) {
  const newProduct = req.body;

  Product.create(newProduct)
    .then((product) => res.status(201).json(product))
    .catch((error) => {
      if (error instanceof Error && error.message.includes('E11000')) {
        return next(new ConflictError('Товар с таким наименованием уже существует'));
      }
      if (error instanceof Error && error.name.includes('ValidationError')) {
        return next(new BadRequestError(error.message.replace('Product validation failed: ', '')));
      }
      return next(error);
    });
}
