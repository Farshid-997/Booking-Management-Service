import { PrismaClient, User } from '@prisma/client';
import ApiError from '../../errors/ApiError';

const prisma = new PrismaClient();

const getAllUser = async (): Promise<any[] | null> => {
  const allUsers = await prisma.user.findMany({});
  const result = allUsers.map(({ password, ...rest }) => {
    return rest;
  });

  return result;
};

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
