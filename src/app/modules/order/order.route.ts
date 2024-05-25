import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post('/', OrderControllers.createOrder); // Route for create new order.
router.get('/', OrderControllers.getAllOrders); // Route for get all orders and also query orders.

export const OrderRoutes = router;
