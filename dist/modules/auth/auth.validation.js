"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string().optional(),
        name: zod_1.z.string({
            required_error: ' Name is required',
        }),
        username: zod_1.z.string({
            required_error: 'User  Name is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'contact Number is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        role: zod_1.z.string().optional(),
        profileImg: zod_1.z.string().optional(),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
exports.authValidation = {
    createUserZodSchema,
};
