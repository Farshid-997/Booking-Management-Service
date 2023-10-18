import { User } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import { sendResponse } from '../../shared/sendResponse';
import { adminFilterableFields } from './admin.constant';
import { adminService } from './admin.service';

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;

    const result = await adminService.createAdmin(userData);

    sendResponse<User>(res, {
      success: true,
      statusCode: 200,
      message: 'Admin created successfully',
      data: result,
    });
  }
);

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await adminService.getAllAdmin(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const singleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await adminService.getsingleAdmin(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetch single Admin successfully',

    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await adminService.updateAdmin(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully',

    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await adminService.deleteService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully',

    data: result,
  });
});

export const adminController = {
  createAdmin,
  getAllAdmins,
  singleAdmin,
  updateAdmin,
  deleteService,
};
