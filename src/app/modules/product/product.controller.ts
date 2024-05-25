import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productZodValidationSchema from './product.zod.validation';

// Controller for create a new product

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    const zodValidatedData = productZodValidationSchema.parse(product);

    const result = await ProductServices.createProductToDB(zodValidatedData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// Controller for get all products

const getAllProducts = async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm as string;
  try {
    const result = await ProductServices.getAllProductsFromDB(searchTerm);
    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term ${searchTerm} fetched successfully!`
        : 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// Controller for get a single product by id

const getProductById = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getProductByIdFromDB(
      req.params.productId,
    );

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// Controller for update product

const updateProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.updateProductInDB(
      req.params.productId,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// Controller for delete product

const deleteProduct = async (req: Request, res: Response) => {
  try {
    await ProductServices.deleteProductFromDB(req.params.productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
