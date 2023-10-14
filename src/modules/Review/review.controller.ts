import { Review } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import { sendResponse } from '../../shared/sendResponse';
import { reviewFilterableFields } from './review.constant';
import { reviewService } from './review.service';

const createReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...reviewData } = req.body;

    const result = await reviewService.createReview(reviewData);

    sendResponse<Review>(res, {
      success: true,
      statusCode: 200,
      message: 'Review added successfully',
      data: result,
    });
  }
);

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, reviewFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await reviewService.getAllReview(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const singleReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await reviewService.getsingleReview(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetch single Review successfully',

    data: result,
  });
});

export const reviewController = {
  createReview,
  getAllReviews,
  singleReview,
};
