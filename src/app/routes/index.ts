import express from 'express';
import { bookingRoutes } from '../../modules/Booking/booking.route';
import { reviewRoutes } from '../../modules/Review/review.route';
import { serviceRoutes } from '../../modules/Service/service.route';
import { adminRoutes } from '../../modules/admin/admin.route';
import { authRoutes } from '../../modules/auth/auth.route';
import { UserRoutes } from '../../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },

  {
    path: '/auth',
    route: authRoutes,
  },

  {
    path: '/service',
    route: serviceRoutes,
  },

  {
    path: '/booking',
    route: bookingRoutes,
  },
  {
    path: '/review',
    route: reviewRoutes,
  },

  {
    path: '/admin',
    route: adminRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
