import { NextFunction, Request, Response } from "express";
import Product from "../models/product";
import { ConflictError } from "../errors/conflict-error";

export function getProductList(req: Request, res: Response, next: NextFunction) {
  Product.find({}, {__v: 0})
    .then(productList => {
      res.status(200).send({
        'items': productList,
        'total': productList.length
      });
      console.log('sent');
    })
    .catch(error => next(error))
}

export function addProduct(req: Request, res: Response, next: NextFunction) {
  const newProduct = req.body;

  Product.create(newProduct)
    .then(product => res.status(200).json(product))
    .catch(error => {
      if (error instanceof Error && error.message.includes('E11000')) {
        error = new ConflictError('Товар с таким наименованием уже существует');
      }
      return next(error)
    })
}