/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { TerrorSourse } from '../interface/error';
import HandleZodError from '../errors/HandleZodError';
import config from '../config';
import AppError from '../errors/AppError';
import HandleMongooseError from '../errors/HandleMongooseError';
import HandleCastError from '../errors/HandleCastError';
import HandleDuplicateError from '../errors/HandleDuplicateError';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something Went wrong';
  let errorSources: TerrorSourse[] = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (error?.name === 'ZodError') {
    const simplifiedError = HandleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.name === 'CastError') {
    const simplifiedError = HandleCastError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = HandleMongooseError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorSources = [
      {
        path: '',
        message: error?.message,
      },
    ];
  } else if (error?.code === 11000) {
    const simplifiedError = HandleDuplicateError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error instanceof Error) {
    message = error?.message;

    errorSources = [
      {
        path: '',
        message: error?.message,
      },
    ];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? error.stack : null,
  });
};

export default globalErrorHandler;
