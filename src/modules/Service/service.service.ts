import { Prisma, PrismaClient, Service } from '@prisma/client';
import ApiError from '../../errors/ApiError';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { IGenericResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import {
  IServiceFilterRequest,
  serviceSearchableFields,
} from './service.constant';

const prisma = new PrismaClient();
const createService = async (service: Service): Promise<Service | null> => {
  const result = await prisma.service.create({
    data: service,
  });

  if (!result) {
    throw new ApiError(400, 'failed to created new service');
  }
  return result;
};

const getAllService = async (
  filters: IServiceFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: serviceSearchableFields.map(field => ({
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
  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.service.findMany({
    where: whereConditions,
    skip,
    take: limit,
  });

  const total = await prisma.service.count({
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

const getsingleService = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const updateService = async (
  id: string,
  payload: Partial<Service>
): Promise<Service> => {
  const result = await prisma.service.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteService = async (id: string): Promise<Service> => {
  // Query related bookings and reviews for the service
  const relatedService = await prisma.service.findUnique({
    where: { id },
    include: { bookings: true, reviews: true },
  });

  if (!relatedService) {
    throw new Error(`Service with id ${id} not found.`);
  }

  const relatedBookings = relatedService.bookings;
  const relatedReviews = relatedService.reviews;

  // Handle related bookings (if needed)
  for (const booking of relatedBookings) {
    await prisma.booking.delete({
      where: {
        id: booking.id, // Assuming 'id' is the primary key of the 'bookings' table
      },
    });
  }

  // Handle related reviews (if needed)
  if (relatedReviews) {
    for (const review of relatedReviews) {
      await prisma.review.delete({
        where: {
          id: review.id, // Assuming 'id' is the primary key of the 'reviews' table
        },
      });
    }
  }

  // Finally, delete the service
  const result = await prisma.service.delete({
    where: {
      id,
    },
  });

  return result;
};

export const serviceService = {
  createService,
  getAllService,
  getsingleService,
  updateService,
  deleteService,
};
