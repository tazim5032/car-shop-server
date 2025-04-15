/* eslint-disable @typescript-eslint/no-unused-vars */
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import { TUserRole } from '../modules/Users/user.interface';
import { UserModel } from '../modules/Users/user.model';

const Auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not Authorized for this action!',
      );
    }
    const decoded = jwt.verify(
      token,
      config.access_secret as string,
    ) as JwtPayload;
    const { role, email } = decoded;
    const user = await UserModel.isUserExistsByEmail(email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User is not found!');
    }
    const userStatus = user?.isBlocked;
    if (userStatus) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not Authorized for this action!',
      );
    }
    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not Authorized for this action!',
      );
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default Auth;
