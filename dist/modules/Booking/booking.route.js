"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../app/middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../app/middlewares/validateRequest"));
const user_1 = require("../../enums/user");
const booking_controller_1 = require("./booking.controller");
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
router.post('/create-booking', (0, validateRequest_1.default)(booking_validation_1.bookingValidation.createBookingZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), booking_controller_1.bookingController.createBooking);
router.get('/', booking_controller_1.bookingController.getAllBookings);
router.get('/:id', booking_controller_1.bookingController.singleBooking);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(booking_validation_1.bookingValidation.updateBookingZodSchema), booking_controller_1.bookingController.updateBooking);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), booking_controller_1.bookingController.deleteBooking);
exports.bookingRoutes = router;
