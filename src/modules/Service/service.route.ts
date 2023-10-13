import express from 'express';
import auth from '../../app/middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { serviceController } from './servicer.controller';

const router = express.Router();
router.post(
  '/create-service',
  auth(ENUM_USER_ROLE.ADMIN),
  serviceController.createService
);

router.get('/service', serviceController.getAllServices);

router.get('/service/:id', serviceController.singleService);

router.patch(
  '/service/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  serviceController.updateService
);
router.delete(
  '/service/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  serviceController.deleteService
);

export const serviceRoutes = router;
