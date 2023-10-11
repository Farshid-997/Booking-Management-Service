import { Request, RequestHandler, Response } from 'express';

import { Order } from '@prisma/client';
import catchAsync from '../../shared/catchAsync';

import { sendResponse } from '../../shared/sendResponse';
import { OrderService } from './order.service';

// create
const createOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...orderData } = req.body;
    const { userId } = req.user!;
    const result = await OrderService.createOrderService(orderData, userId);

    sendResponse<Order>(res, {
      success: true,
      statusCode: 200,
      message: 'Order created successfully',
      data: result,
    });
  }
);

// getorder
const getOrders: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user!;
    let result;
    if (req.user?.role === 'admin') {
      result = await OrderService.getAllOrders();
    } else {
      result = await OrderService.getOrdersByUser(userId);
    }

    sendResponse<Order[]>(res, {
      statusCode: 200,
      success: true,
      message: 'Orders retrieved successfully',
      data: result,
    });
  }
);

// getorderId
const getOrdersbyId: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId, role } = req.user!;
    const { orderId } = req.params;
    const result = await OrderService.getOrdersByIdService(
      userId,
      role,
      orderId
    );

    sendResponse<Order>(res, {
      statusCode: 200,
      success: true,
      message: 'Order fetched successfully',
      data: result,
    });
  }
);
export const OrderController = {
  createOrder,
  getOrders,
  getOrdersbyId,
};
