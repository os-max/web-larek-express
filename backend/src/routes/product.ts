import { Router } from 'express';
import { validateProduct } from '../middlewares/validations';
import { addProduct, getProductList } from '../controllers/product';

const router = Router();

router.get('/', getProductList);

router.post('/', validateProduct, addProduct);

export default router;
