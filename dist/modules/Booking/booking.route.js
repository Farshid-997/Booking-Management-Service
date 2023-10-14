"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post('/create-booking', 
// auth(ENUM_USER_ROLE.ADMIN),
booking_controller_1.bookingController.createBooking);
router.get('/bookings', booking_controller_1.bookingController.getAllBookings);
router.get('/:id', booking_controller_1.bookingController.singleBooking);
router.patch('/:id', 
// auth(ENUM_USER_ROLE.ADMIN),
booking_controller_1.bookingController.updateBooking);
router.delete('/:id', 
// auth(ENUM_USER_ROLE.ADMIN),
booking_controller_1.bookingController.deleteBooking);
exports.bookingRoutes = router;
