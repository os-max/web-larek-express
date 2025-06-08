import Joi from 'joi';
import { celebrate, Segments } from 'celebrate';

// Product

const productSchema = Joi.object({
  title: Joi.string().max(40).required(),
  category: Joi.string().max(20).required(),
  description: Joi.string().max(100).required(),
  price: Joi.number(),
  image: {
    fileName: Joi.string().required(),
    originalName: Joi.string().required(),
  },
});

export const validateProduct = celebrate({ [Segments.BODY]: productSchema });

// Order

const orderSchema = Joi.object({
  payment: Joi.string().valid('card', 'online').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  total: Joi.number().required(),
  items: Joi.array().items(Joi.string().required()),
});

export const validateOrder = celebrate({ [Segments.BODY]: orderSchema });
