"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidation = void 0;
const zod_1 = require("zod");
const createBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string().optional(),
        date: zod_1.z.string({
            required_error: 'Date is required',
        }),
        status: zod_1.z.string({
            required_error: 'Status is required',
        }),
    }),
});
const updateBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string().optional(),
        date: zod_1.z.string().optional(),
        status: zod_1.z.string().optional(),
    }),
});
exports.bookingValidation = {
    createBookingZodSchema,
    updateBookingZodSchema,
};
