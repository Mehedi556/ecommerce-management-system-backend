export interface Inventory {
  quantity: number;
  inStock: boolean;
}

export interface Variant {
  type: string;
  value: string;
}

export interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: {
    type: string;
    value: string;
  }[];
  inventory: Inventory;
}
