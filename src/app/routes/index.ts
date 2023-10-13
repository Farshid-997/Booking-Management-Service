import express from 'express';
import { serviceRoutes } from '../../modules/Service/service.route';
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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
