import express from 'express';
import { productControler } from './product.controller';
import ValidateRequest from '../../middlewares/validateRequests';

import Auth from '../../middlewares/auth';
import { carValidation } from './product.validation';

const router = express.Router();

router.post(
  '/add-new-car',
  Auth('admin'),
  ValidateRequest(carValidation.carValidationSchema),
  productControler.createCarProduct,
);
router.get('/get-cars', productControler.getAllCars);
router.get('/:carId', productControler.getCarInfo);
router.delete('/:carId', productControler.deleteCar);
router.patch('/:carId', productControler.updateCarInfo);
router.get('/order/all-orders', productControler.getAllOrder)
router.get('/orders/all-cars', productControler.getOrderByEmail)



export const carRoutes = router;
