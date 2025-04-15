/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { Product } from '../Products/product.model';
import config from '../../config';
import { ObjectId } from 'mongodb';
import { TOrder } from './payment.interface';
import axios from 'axios';
import { OrderModel } from './payment.model';

const createPaymentIntoDB = async (product: TOrder) => {
  const productInfo = await Product.findById({
    _id: new mongoose.Types.ObjectId(product?.productId),
  });
  let total = productInfo?.price;
  if (product.paymentMethod === 'BDT') {
    total = parseInt((Number(total) * 83.18).toString());
  }
  const transactionId = new ObjectId().toString();
  const initialData = {
    store_id: config.store_id,
    store_passwd: config.store_pass,
    total_amount: total,
    currency: product?.paymentMethod,
    tran_id: transactionId,
    success_url: `${config.back_end_url}/api/orders/success-payment`,
    fail_url: `${config.back_end_url}/api/orders/failed`,
    cancel_url: `${config.back_end_url}/api/orders/canceled`,
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: product?.name,
    cus_email: product?.email,
    cus_add1: product?.address,
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01798746536',
    cus_fax: '01789768576',
    ship_name: product?.name,
    ship_add1: 'Feni',
    ship_add2: 'Feni',
    ship_city: 'Feni',
    ship_state: 'Feni',
    ship_postcode: 3900,
    ship_country: 'Bangladesh',
  };

  const response = await axios.post(
    'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
    initialData,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  const orderInfo = {
    name: product?.name,
    email: product?.email,
    amount: productInfo?.price,
    payment_id: transactionId,
    product: product?.productId,
    status: 'pending',
  };
  const Saveres = await OrderModel.create(orderInfo);
  if (Saveres) {
    return {
      paymentUrl: response.data?.GatewayPageURL,
    };
  }
};

const successOrder = async (id: string, successInfo: any) => {
  await OrderModel.findOneAndUpdate(
    { payment_id: successInfo?.tran_id },
    { status: 'success' },
    { new: true },
  );
  const orderData = await OrderModel.findOne({
    payment_id: successInfo?.tran_id,
  });
  const Saveres = await Product.findByIdAndUpdate(
    { _id: orderData?.product },
    { $inc: { quantity: -1 } },
    { new: true },
  );
  if (Saveres?.quantity === 0) {
    await Product.findByIdAndUpdate(
      { _id: orderData?.product },
      { inStock: false },
      { new: true },
    );
  }
  return {
    message: 'Order done',
  };
};

export const orderService = {
  createPaymentIntoDB,
  successOrder,
};
