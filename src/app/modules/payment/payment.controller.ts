import config from '../../config';
import { orderService } from './payment.service';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

const createOrder = catchAsync(async (req, res) => {
  const info = req.body;
  const ressult = await orderService.createPaymentIntoDB(info);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Product Ordered successfully`,
    data: ressult,
  });
});
const successPayment = catchAsync(async (req, res) => {
  const successInfo = req.body;
  if (successInfo?.status !== 'VALID') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Payment');
  }
  await orderService.successOrder(successInfo?.tran_id, successInfo);
  res.redirect(`${config.front_end_url}/success`);
});
const failedPayment = catchAsync(async (req, res) => {
  res.redirect(`${config.front_end_url}/fail`);
});
const canceledPayment = catchAsync(async (req, res) => {
  res.redirect(`${config.front_end_url}/cancel`);
});
export const orderController = {
  createOrder,
  failedPayment,
  canceledPayment,
  successPayment,
};
