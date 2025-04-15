import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { UserService } from './user.service';

const userCreation = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserService.createUser(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registration successfully done!',
    data: {
      id: result._id,
      email: result.email,
      name: result.name,
    },
  });
});

const getUsers = catchAsync(async (req, res) => {
  const query = req.query;
  const allUsers = await UserService.getUsersFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User successfully retrived!',
    data: allUsers,
  });
});

const getAnUser = catchAsync(async (req, res) => {
  const { email } = req.params;
  const userDetails = await UserService.getUserDetails(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Details successfully retrived!',
    data: userDetails,
  });
});

const BlockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const query = req.query;
  await UserService.blockUser(userId, query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User is ${query?.isBlock === 'true' ? 'blocked' : 'unblocked'}`,
    data: null,
  });
});

const changeUserPassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const user = req.user;
  await UserService.changePassword(user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Password successfully changed!',
    data: null,
  });
});

export const UserController = {
  userCreation,
  getUsers,
  getAnUser,
  BlockUser,
  changeUserPassword,
};
