import { Prisma, PrismaClient, Review } from '@prisma/client';
import ApiError from '../../errors/ApiError';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { IGenericResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import {
  IReviewFilterRequest,
  reviewSearchableFields,
} from './review.constant';

const prisma = new PrismaClient();
const createReview = async (review: Review): Promise<Review | null> => {
  const result = await prisma.review.create({
    data: review,
  });

  if (!result) {
    throw new ApiError(400, 'failed to created new review');
  }
  return result;
};

const getAllReview = async (
  filters: IReviewFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Review[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: reviewSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.ReviewWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.review.findMany({
    where: whereConditions,
    skip,
    take: limit,

    include: {
      user: true,
      service: true,
    },
  });

  const total = await prisma.review.count({
    where: whereConditions,
  });

  const totalPages = Math.ceil(total / Number(limit));
  return {
    meta: {
      total,
      page,
      limit,
      totalPages,
    },
    data: result,
  };
};

const getsingleReview = async (id: string): Promise<Review | null> => {
  const result = await prisma.review.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const updateReview = async (
  id: string,
  payload: Partial<Review>
): Promise<Review> => {
  const result = await prisma.review.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const reviewService = {
  createReview,
  getAllReview,
  getsingleReview,
  updateReview,
};
