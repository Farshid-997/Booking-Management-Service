import { Prisma, PrismaClient, User } from '@prisma/client';
import ApiError from '../../errors/ApiError';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { IGenericResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import { IUserFilterRequest, userSearchableFields } from './user.constant';

const prisma = new PrismaClient();

const getAllUser = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map(field => ({
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

// const getAllUser = async (): Promise<any[] | null> => {
//   const allUsers = await prisma.user.findMany({});
//   const result = allUsers.map(({ password, ...rest }) => {
//     return rest;
//   });

//   return result;
// };

const getSingleUser = async (
  id: string
): Promise<Omit<User, 'password'> | {}> => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  const { password, ...rest } = user || {};
  return rest;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const isExist = await getSingleUser(id);

  if (!isExist) {
    throw new ApiError(404, 'User not found !');
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
