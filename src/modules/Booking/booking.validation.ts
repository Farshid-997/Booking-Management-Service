import { z } from 'zod';
const createBookingZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    date: z.string({
      required_error: 'Date is required',
    }),

    status: z.string({
      required_error: 'Status is required',
    }),
  }),
});

const updateBookingZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    date: z.string().optional(),

    status: z.string().optional(),
  }),
});

export const bookingValidation = {
  createBookingZodSchema,
  updateBookingZodSchema,
};
