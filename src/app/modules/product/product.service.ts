import { Product } from './product.interface';
import { ProductModel } from './product.model';

// Service for create a new product in DB.

const createProductToDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

// Service for get all products from DB.

const getAllProductsFromDB = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'i');

  const result = await ProductModel.find({
    $or: [{ name: regex }, { tags: regex }, { category: regex }],
  });
  return result;
};

// Service for get a single product by id from DB.

const getProductByIdFromDB = async (productId: string) => {
  const result = await ProductModel.findById(productId);
  return result;
};

// Service for update product in DB.

const updateProductInDB = async (productId: string, product: Product) => {
  const result = await ProductModel.findByIdAndUpdate(productId, product);
  return result;
};

// Service for delete product from DB.

const deleteProductFromDB = async (productId: string) => {
  const result = await ProductModel.findByIdAndDelete(productId);
  return result;
};

export const ProductServices = {
  createProductToDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductInDB,
  deleteProductFromDB,
};
