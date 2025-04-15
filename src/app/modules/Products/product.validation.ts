import { z } from 'zod';

const carValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    image: z.string().min(1, { message: 'Image is required.' }),
    brand: z.string().min(1, { message: 'Brand is required.' }),
    price: z
      .number()
      .positive({ message: 'Price should be a positive number.' })
      .refine((value) => value > 0, {
        message: 'Price should be greater than zero.',
      }),
    category: z.enum(
      ['Sedan', 'SUV', 'Truck', 'Hatchback', 'Sports', 'Electric', 'Luxury'],
      {
        message:
          'Category should be: Sedan, SUV, Truck, Hatchback, Sports, Electric, Luxury',
      },
    ),
    description: z.string().min(1, { message: 'Description is required.' }),
    quantity: z
      .number()
      .int({ message: 'Quantity must be an integer.' })
      .min(0, { message: 'Quantity must be at least 0.' }),
    inStock: z.boolean({
      required_error: 'In-stock status is required.',
      invalid_type_error: 'In-stock status must be a boolean.',
    }),
  }),
});

export const carValidation = {
  carValidationSchema,
};
