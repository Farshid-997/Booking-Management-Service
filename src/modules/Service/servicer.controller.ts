import { Service } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import { sendResponse } from '../../shared/sendResponse';
import { serviceFilterableFields } from './service.constant';
import { serviceService } from './service.service';

const createService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...serviceData } = req.body;

    const result = await serviceService.createService(serviceData);

    sendResponse<Service>(res, {
      success: true,
      statusCode: 200,
      message: 'Service created successfully',
      data: result,
    });
  }
);

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await serviceService.getAllService(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const singleService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await serviceService.getsingleService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetch single Service successfully',

    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await serviceService.updateService(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',

    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await serviceService.deleteService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully',

    data: result,
  });
});

export const serviceController = {
  createService,
  getAllServices,
  singleService,
  updateService,
  deleteService,
};
