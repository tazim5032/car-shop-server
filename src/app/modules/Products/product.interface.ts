

export type TProduct = {
  name: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  category: 'Sedan' | 'SUV' | 'Truck' | 'Hatchback' | 'Sports' | 'Electric' | 'Luxury';
  inStock: boolean;
};