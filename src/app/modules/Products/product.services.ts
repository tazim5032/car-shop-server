import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { OrderModel } from '../payment/payment.model';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import { SearchAbleFields } from './product.constant';

const createCarIntoDB = async (carInfo: TProduct) => {
  const result = await Product.create(carInfo);
  return result;
};

const getCarsFromDB = async (query: Record<string, unknown>) => {
  const carQuery = new QueryBuilder(Product.find(), query)
    .search(SearchAbleFields)
    .sort()
    .filter()
    .paginate();
  const result = await carQuery.modelQuery;
  const meta = await carQuery.countTotal();
  return {
    meta,
    result,
  };
};

const getOrdersFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(
    OrderModel.find({ status: 'success' }).populate('product'),
    query,
  )
    .paginate()
    .fieldsLimiting();
  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();
  return {
    meta,
    result,
  };
};

const getCarDetails = async (id: string) => {
  const result = await Product.findById({
    _id: new mongoose.Types.ObjectId(id),
  });
  return result;
};
const getOrdersByEmailFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(
    OrderModel.find({ status: 'success' }).populate('product'),
    query,
  )
    .filter()
    .paginate()
    .fieldsLimiting();
  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();
  return {
    meta,
    result,
  };
};

const updateCarIntoDB = async (id: string, carData: TProduct) => {
  const result = await Product.findByIdAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    carData,
    { new: true },
  );
  return result;
};

const deleteCarFromDB = async (id: string) => {
  const result = await Product.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  return result;
};

export const carService = {
  createCarIntoDB,
  getOrdersFromDB,
  getCarsFromDB,
  getOrdersByEmailFromDB,
  getCarDetails,
  deleteCarFromDB,
  updateCarIntoDB,
};
