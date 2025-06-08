// POST /order — создаёт заказ

import { Router } from "express";
import { validateOrder } from "../middlewares/validations";
import { postOrder } from "../controllers/order";

const router = Router();

router.post('/', validateOrder, postOrder)

export default router;