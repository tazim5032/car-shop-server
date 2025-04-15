import { Request, Response } from 'express';
import { carService } from './product.services';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
const createCarProduct = async (req: Request, res: Response) => {
  try {
    const carData = req.body;
    const result = await carService.createCarIntoDB(carData);
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Car successfully Created',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Validation failed for car data',
      error,
    });
  }
};

const getAllCars = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const result = await carService.getCarsFromDB(query);
    res.status(200).json({
      success: true,
      message: 'Cars retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const getCarDetails = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await carService.getCarDetails(carId);
    res.status(200).json({
      success: true,
      message: 'Car Details retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const getCarInfo = catchAsync(async (req, res) => {
  const { carId } = req.params;
  const result = await carService.getCarDetails(carId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Car info Retrive successfully`,
    data: result,
  });
});

const deleteCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;

    const result = await carService.deleteCarFromDB(carId);
    if (result.deletedCount) {
      res.status(200).json({
        success: true,
        message: 'Car is deleted successfully',
        data: {},
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Already deleted ',
        data: {},
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const updateCarInfo = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const updatedData = req.body;
    const result = await carService.updateCarIntoDB(carId, updatedData);
    res.status(200).json({
      success: true,
      message: 'Car info updated successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const getAllOrder = catchAsync(async (req, res) => {
  const result = await carService.getOrdersFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Orders Retrive successfully`,
    data: result,
  });
});

const getOrderByEmail = catchAsync(async (req, res) => {
  const result = await carService.getOrdersByEmailFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Orders Retrive successfully`,
    data: result,
  });
});

export const productControler = {
  createCarProduct,
  getAllCars,
  updateCarInfo,
  getCarDetails,
  getCarInfo,
  deleteCar,
  getAllOrder,
  getOrderByEmail,
};
