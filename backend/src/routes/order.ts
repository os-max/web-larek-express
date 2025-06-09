// POST /order — создаёт заказ

import { Router } from 'express';
import { validateOrder } from '../middlewares/validations';
import createOrder from '../controllers/order';

const router = Router();

router.post('/', validateOrder, createOrder);

export default router;
