import { Order } from '@prisma/client';
import ApiError from '../../errors/ApiError';
import prisma from '../../shared/prisma';

const createOrderService = async (
  order: Order,
  userId: string
): Promise<Order | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ApiError(404, 'User not found !');
    }

    const result = await prisma.order.create({
      data: {
        userId: user.id,
        orderedBooks: order.orderedBooks!,
      },
    });

    return result;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new ApiError(404, 'faield to create Order !');
  }
};

const getAllOrders = async (): Promise<Order[] | null> => {
  const result = await prisma.order.findMany({});
  return result;
};

const getOrdersByUser = async (id: string): Promise<Order[] | null> => {
  const result = await prisma.order.findMany({
    where: { userId: id },
  });
  return result;
};

const getOrdersByIdService = async (
  userId: string,
  role: string,
  orderId: string
): Promise<Order | null> => {
  let result;
  if (role === 'admin') {
    result = await prisma.order.findUnique({
      where: { id: orderId },
    });
  } else {
    result = await prisma.order.findUnique({
      where: {
        userId: userId,
        id: orderId,
      },
    });
  }

  return result;
};

export const OrderService = {
  createOrderService,
  getOrdersByUser,
  getAllOrders,
  getOrdersByIdService,
};
