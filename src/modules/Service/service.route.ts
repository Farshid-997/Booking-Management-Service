import express from 'express';

import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../enums/user';
import { serviceValidation } from './service.validation';
import { serviceController } from './servicer.controller';

const router = express.Router();
router.post(
  '/create-service',
  validateRequest(serviceValidation.createServiceZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  serviceController.createService
);

router.get(
  '/',

  serviceController.getAllServices
);

router.get('/:id', serviceController.singleService);

router.patch(
  '/:id',
  validateRequest(serviceValidation.updateServiceZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  serviceController.updateService
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  serviceController.deleteService
);

export const serviceRoutes = router;
