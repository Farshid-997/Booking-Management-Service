import { z } from 'zod';
const createReviewZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    text: z.string({
      required_error: 'Review Text is required',
    }),

    price: z.number({
      required_error: 'Review Rating is required',
    }),
  }),
});

const updateReviewZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    text: z.string().optional(),

    price: z.number().optional(),
  }),
});

export const reviewValidation = {
  createReviewZodSchema,
  updateReviewZodSchema,
};
