import { z } from 'zod';

// Sub-Inventory zod schema
const inventoryZodValidationSchema = z.object({
  quantity: z
    .number()
    .min(0, { message: "Quantity can't be a negative number" }),
  inStock: z.boolean(),
});

// Sub-Variant zod schema
const variantZodValidationSchema = z.object({
  type: z.string().min(1, { message: 'Type is required' }),
  value: z.string().min(1, { message: 'Value is required' }),
});

// Product main zod schema
const productZodValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  price: z.number().min(0, { message: "Price can't be a negative number" }),
  category: z.string().min(1, { message: 'Category is required' }),
  tags: z.array(z.string().min(1, { message: 'Tags are required' })),
  variants: z.array(variantZodValidationSchema),
  inventory: inventoryZodValidationSchema,
});

export default productZodValidationSchema;
