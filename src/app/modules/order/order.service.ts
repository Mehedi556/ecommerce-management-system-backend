import { Order } from './order.interface';
import { OrderModel } from './order.model';

// Service for create new order in DB.

const createOrderToDB = async (order: Order) => {
  const result = await OrderModel.create(order);
  return result;
};

// Service for get all orders and also query orders from DB.

const getAllOrdersFromDB = async (email?: string) => {
  if (!email) {
    const result = await OrderModel.find();
    return result;
  }

  const result = await OrderModel.find({ email }).exec();
  return result;
};

export const OrderServices = {
  createOrderToDB,
  getAllOrdersFromDB,
};
