"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidation = void 0;
const zod_1 = require("zod");
const createReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string().optional(),
        text: zod_1.z.string({
            required_error: 'Review Text is required',
        }),
        rating: zod_1.z.number({
            required_error: 'Review Rating is required',
        }),
    }),
});
const updateReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string().optional(),
        text: zod_1.z.string().optional(),
        rating: zod_1.z.number().optional(),
    }),
});
exports.reviewValidation = {
    createReviewZodSchema,
    updateReviewZodSchema,
};
