import express from 'express';
import { bookingController } from './booking.controller';

const router = express.Router();
router.post(
  '/create-booking',
  // auth(ENUM_USER_ROLE.ADMIN),
  bookingController.createBooking
);

router.get('/bookings', bookingController.getAllBookings);

router.get('/booking/:id', bookingController.singleBooking);

router.patch(
  '/booking/:id',
  // auth(ENUM_USER_ROLE.ADMIN),
  bookingController.updateBooking
);
router.delete(
  '/booking/:id',
  // auth(ENUM_USER_ROLE.ADMIN),
  bookingController.deleteBooking
);

export const bookingRoutes = router;
