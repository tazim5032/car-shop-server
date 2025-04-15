import { Types } from 'mongoose';

export interface IOrder {
  name: string;
  email: string;
  amount: number;
  payment_id: string;
  status: 'pending' | 'success' | 'failed';
  product: Types.ObjectId;
  delivered: 'Pending' | 'Processing' | 'Delivered';
}

export type TOrder = {
  name: string;
  email: string;
  address: string;
  productId: string;
  paymentMethod: string;
  totalPrice: number;
};
