import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { ProductServices } from '../product/product.service';
import orderZodValidationSchema from './order.zod.validation';

// Controller for create new order

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    // first I tried to check that the product is stored in db by the provided productId or not
    const matchedProduct = await ProductServices.getProductByIdFromDB(
      order.productId,
    );

    // If I fount the product, then I check that the product quantity is sufficient or not!
    if (matchedProduct) {
      // If product quantity is insufficient then I make the inStock field = false and return json data success: false and error message also.
      if (matchedProduct.inventory.quantity < 1) {
        matchedProduct.inventory.inStock = false;

        return res.json({
          success: false,
          message: 'Insufficient quantity available in inventory',
        });
      }
      // If product quantity is sufficient then I make the inStock field to (true) and reduce the quantity of main product as order quantity.
      else {
        matchedProduct.inventory.inStock = true;
        matchedProduct.inventory.quantity =
          matchedProduct.inventory.quantity - req.body.quantity;

        if (matchedProduct.inventory.quantity < 1) {
          matchedProduct.inventory.inStock = false;
        } else {
          matchedProduct.inventory.inStock = true;
        }

        matchedProduct.save();

        const zodValidatedData = orderZodValidationSchema.parse(order);

        const result = await OrderServices.createOrderToDB(zodValidatedData);

        return res.status(200).json({
          success: true,
          message: 'Order created successfully!',
          data: result,
        });
      }
      // Lastly if I not found the product stored in db by the provided productId then I just return success: false value also with proper error message.
    } else {
      return res.json({
        success: false,
        message: 'Product not found by this id.',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// Controller for get all orders and query orders also

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const queryEmail = req.query.email;

    const result = await OrderServices.getAllOrdersFromDB(
      queryEmail as string | undefined,
    );
    if (result.length < 1) {
      return res.json({
        success: false,
        message: 'Order not found.',
      });
    }
    return res.status(200).json({
      success: true,
      message: queryEmail
        ? `Orders fetched successfully for user ${queryEmail}!`
        : 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
