import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';

import { sendResponse } from '../../shared/sendResponse';
import { UserService } from './user.service';

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getAllUser();
  sendResponse<User[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: users,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);

  sendResponse<Partial<User>>(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await UserService.updateUser(id, updatedData);

  sendResponse<User>(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await UserService.deleteUser(id);

  sendResponse<User>(res, {
    statusCode: 200,
    success: true,
    message: 'Uers deleted successfully',
    data: result,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user!;
  const result = await UserService.getSingleUser(userId);

  sendResponse<Partial<User>>(res, {
    statusCode: 200,
    success: true,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

export const UserController = {
  getSingleUser,
  getAllUser,
  updateUser,
  deleteUser,
  getProfile,
};
