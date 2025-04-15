import mongoose from 'mongoose';
import { TerrorSourse, TGenericErrorResponse } from '../interface/error';

const HandleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSources: TerrorSourse[] = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  return {
    statusCode,
    message: 'Casting Validation Error',
    errorSources,
  };
};

export default HandleCastError;
