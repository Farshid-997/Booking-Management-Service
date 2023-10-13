"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_route_1 = require("../../modules/Booking/booking.route");
const service_route_1 = require("../../modules/Service/service.route");
const auth_route_1 = require("../../modules/auth/auth.route");
const user_route_1 = require("../../modules/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/user',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.authRoutes,
    },
    {
        path: '/service',
        route: service_route_1.serviceRoutes,
    },
    {
        path: '/booking',
        route: booking_route_1.bookingRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
