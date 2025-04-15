import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchem = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: {
      type: String,
      enum: [
        'Sedan',
        'SUV',
        'Truck',
        'Hatchback',
        'Sports',
        'Electric',
        'Luxury',
      ],
    },
    inStock: { type: Boolean, required: true },
  },
  { timestamps: true },
);

export const Product = model<TProduct>('Product', productSchem);
