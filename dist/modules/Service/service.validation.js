"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceValidation = void 0;
const zod_1 = require("zod");
const createServiceZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string().optional(),
        name: zod_1.z.string({
            required_error: 'Service Name is required',
        }),
        description: zod_1.z.string({
            required_error: 'Service Description is required',
        }),
        location: zod_1.z.string().optional(),
    }),
});
const updateServiceZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
    }),
    availability: zod_1.z.boolean().optional(),
});
exports.serviceValidation = {
    createServiceZodSchema,
    updateServiceZodSchema,
};
