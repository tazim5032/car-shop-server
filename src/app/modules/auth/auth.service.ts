import AppError from '../../errors/AppError';

import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import config from '../../config';
import { createToken } from './auth.utils';
import { UserModel } from '../Users/user.model';

const userLoginFromDB = async (paylod: TLoginUser) => {
  const user = await UserModel.isUserExistsByEmail(paylod.email);
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Credentials Do not match!');
  }
  if (user?.isBlocked) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Credentials Do not match!');
  }
  const isPasswordMatched = await UserModel.isPasswordMaatched(
    paylod?.password,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Credentials Do not match!');
  }
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const refreshToken = createToken(
    jwtPayload,
    config.refresh_secret as string,
    config.refresh_expire as string,
  );
  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expire as string,
  );

  return { refreshToken, accessToken };
};

const refreshToken = async (token: string) => {
  const decodedInfo = jwt.verify(
    token,
    config.refresh_secret as string,
  ) as JwtPayload;

  const { email } = decodedInfo;
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Can not find the user!');
  }
  if (user?.isBlocked) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Credentials Do not match!');
  }
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expire as string,
  );
  return {
    accessToken,
  };
};

export const AuthServices = {
  userLoginFromDB,
  refreshToken,
};
