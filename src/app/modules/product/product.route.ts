import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/', ProductControllers.createProduct); // Route for create new product in DB
router.get('/', ProductControllers.getAllProducts); // Route for get all products and also query products from DB
router.get('/:productId', ProductControllers.getProductById); // Route for get a single product by id from DB
router.put('/:productId', ProductControllers.updateProduct); // Route for update product in DB
router.delete('/:productId', ProductControllers.deleteProduct); // Route for delete product by id from DB

export const StudentRoutes = router;
