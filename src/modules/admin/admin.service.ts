import { Prisma, PrismaClient, User } from '@prisma/client';
import ApiError from '../../errors/ApiError';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { IGenericResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import { IAdminFilterRequest, adminSearchableFields } from './admin.constant';

const prisma = new PrismaClient();

const createAdmin = async (user: User): Promise<User | null> => {
  const result = await prisma.user.create({
    data: user,
  });

  if (!result) {
    throw new ApiError(400, 'failed to created new Admin');
  }
  return result;
};

const getAllAdmin = async (
  filters: IAdminFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map(field => ({
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
  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
  });

  const total = await prisma.user.count({
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

const getsingleAdmin = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteService = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const adminService = {
  createAdmin,
  getAllAdmin,
  getsingleAdmin,
  updateAdmin,
  deleteService,
};
