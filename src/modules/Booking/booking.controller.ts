import { Booking } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import { sendResponse } from '../../shared/sendResponse';
import { bookingFilterableFields } from './booking.constant';
import { bookingService } from './booking.service';

const createBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...bookingData } = req.body;

    const result = await bookingService.createBooking(bookingData);

    sendResponse<Booking>(res, {
      success: true,
      statusCode: 200,
      message: 'Booking added successfully',
      data: result,
    });
  }
);

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookingFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await bookingService.getAllBooking(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const singleBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await bookingService.getsingleBooking(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetch single booking successfully',

    data: result,
  });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await bookingService.updateBooking(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully',

    data: result,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await bookingService.deleteBooking(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully',

    data: result,
  });
});

export const bookingController = {
  createBooking,
  getAllBookings,
  singleBooking,
  updateBooking,
  deleteBooking,
};
