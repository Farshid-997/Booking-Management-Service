import express from 'express';

import auth from '../../app/middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { adminController } from './admin.controller';

const router = express.Router();
router.post(
  '/create-admin',

  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  adminController.createAdmin
);

router.get(
  '/',

  adminController.getAllAdmins
);

router.get('/:id', adminController.singleAdmin);

router.patch(
  '/:id',

  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  adminController.updateAdmin
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  adminController.deleteService
);

export const adminRoutes = router;
