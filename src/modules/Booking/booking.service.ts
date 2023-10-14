import { Booking, Prisma, PrismaClient } from '@prisma/client';
import ApiError from '../../errors/ApiError';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { IGenericResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import {
  IBookingFilterRequest,
  bookingSearchableFields,
} from './booking.constant';

const prisma = new PrismaClient();
const createBooking = async (booking: Booking): Promise<Booking | null> => {
  const result = await prisma.booking.create({
    data: booking,
  });

  if (!result) {
    throw new ApiError(400, 'failed to created new booking');
  }
  return result;
};

const getAllBooking = async (
  filters: IBookingFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Booking[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookingSearchableFields.map(field => ({
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
  const whereConditions: Prisma.BookingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.booking.findMany({
    where: whereConditions,
    skip,
    take: limit,

    include: {
      user: true,
      service: true,
    },
  });

  const total = await prisma.booking.count({
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

const getsingleBooking = async (id: string): Promise<Booking | null> => {
  const result = await prisma.booking.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const updateBooking = async (
  id: string,
  payload: Partial<Booking>
): Promise<Booking> => {
  const result = await prisma.booking.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteBooking = async (id: string): Promise<Booking> => {
  const result = await prisma.booking.delete({
    where: {
      id,
    },
  });
  return result;
};

export const bookingService = {
  createBooking,
  getAllBooking,
  getsingleBooking,
  updateBooking,
  deleteBooking,
};
