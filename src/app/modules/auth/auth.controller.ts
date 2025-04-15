import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const userLogin = catchAsync(async (req, res) => {
  const loginData = req.body;
  const loginResponse = await AuthServices.userLoginFromDB(loginData);

  const { refreshToken, accessToken } = loginResponse;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Login successfully done',
    data: { accessToken },
  });
});

const refreshTokenGeneration = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const tokenResponse = await AuthServices.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AccessToken retrieved succesfully!',
    data: tokenResponse,
  });
});

export const AuthController = {
  userLogin,
  refreshTokenGeneration,
};
