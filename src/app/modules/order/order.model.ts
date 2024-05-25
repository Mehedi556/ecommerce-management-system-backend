import { Schema, model } from 'mongoose';
import { Order } from './order.interface';

const orderSchema = new Schema<Order>({
  email: { required: true, type: String },
  productId: { required: true, type: String },
  price: { required: true, type: Number },
  quantity: { required: true, type: Number },
});

export const OrderModel = model<Order>('Order', orderSchema);
