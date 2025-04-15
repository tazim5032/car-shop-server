import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';
import { UserModel } from './user.model';

const createUser = async (payload: TUser) => {
  const res = await UserModel.create(payload);
  return res;
};
const getUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(UserModel.find(), query)
    .filter()
    .paginate();
  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();
  return {
    meta,
    result,
  };
};
const getUserDetails = async (email: string) => {
  const result = await UserModel.findOne({ email });
  return result;
};
const blockUser = async (id: string, query: Record<string, unknown>) => {
  const user = await UserModel.findOne(new mongoose.Types.ObjectId(id));
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Can not find the user!');
  }
  const res = await UserModel.findByIdAndUpdate(id, {
    $set: {
      isBlocked: query?.isBlock,
    },
  });
  return res;
};
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const { email } = userData;
  const user = await UserModel.findOne({ email }).select(
    'email password isBlocked role',
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Can not find the user!');
  }
  const userStauts = user?.isBlocked;
  if (userStauts) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
  }
  const isPasswordMatched = await UserModel.isPasswordMaatched(
    payload?.oldPassword,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match');
  }
  const newHashedPass = await bcrypt.hash(payload?.newPassword, 12);
  await UserModel.findOneAndUpdate(
    { email: userData.email, role: userData.role },
    {
      password: newHashedPass,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );
  return null;
};

export const UserService = {
  createUser,
  getUsersFromDB,
  getUserDetails,
  blockUser,
  changePassword,
};
