import express from 'express';
import validateRequest from '../../app/middlewares/validateRequest';
import { authController } from './auth.controller';
import { authValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(authValidation.createUserZodSchema),
  authController.createUser
);
router.post('/signin', authController.loginUser);
router.post('/refresh-token', authController.getRefreshToken);
export const authRoutes = router;
