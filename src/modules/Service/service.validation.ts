import { z } from 'zod';
const createServiceZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    name: z.string({
      required_error: 'Service Name is required',
    }),

    description: z.string({
      required_error: 'Service Description is required',
    }),

    location: z.string().optional(),
  }),
});

const updateServiceZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    name: z.string().optional(),

    description: z.string().optional(),

    price: z.string().optional(),

    location: z.string().optional(),
  }),
  availability: z.boolean().optional(),
});

export const serviceValidation = {
  createServiceZodSchema,
  updateServiceZodSchema,
};
