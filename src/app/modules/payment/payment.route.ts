import express from 'express';
import { orderController } from './payment.controller';
import Auth from '../../middlewares/auth';
const router = express.Router();
router.post('/create-payment', Auth('user'), orderController.createOrder);
router.post('/success-payment', orderController.successPayment);
router.post('/canceled', orderController.canceledPayment);
router.post('/failed', orderController.failedPayment);

export const OrderRoutes = router;
