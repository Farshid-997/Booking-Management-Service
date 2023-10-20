import { z } from 'zod';
const createReviewZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    text: z.string({
      required_error: 'Review Text is required',
    }),

    rating: z.string({
      required_error: 'Review Rating is required',
    }),
  }),
});

const updateReviewZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    text: z.string().optional(),

    rating: z.string().optional(),
  }),
});

export const reviewValidation = {
  createReviewZodSchema,
  updateReviewZodSchema,
};
