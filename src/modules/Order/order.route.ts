import express from 'express';
import auth from '../../app/middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { OrderController } from './order.controller';

const router = express.Router();
router.post(
  '/orders/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.createOrder
);

router.get(
  '/orders',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getOrders
);
router.get(
  '/orders/:orderId',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getOrdersbyId
);

export const OrderRoutes = router;
