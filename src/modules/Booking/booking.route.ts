import express from 'express';
import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../enums/user';
import { reviewValidation } from '../Review/review.validation';
import { bookingController } from './booking.controller';

const router = express.Router();
router.post(
  '/create-booking',
  validateRequest(reviewValidation.createReviewZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  bookingController.createBooking
);

router.get(
  '/bookings',

  bookingController.getAllBookings
);

router.get('/:id', bookingController.singleBooking);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(reviewValidation.updateReviewZodSchema),
  bookingController.updateBooking
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  bookingController.deleteBooking
);

export const bookingRoutes = router;
