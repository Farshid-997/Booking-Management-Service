import { z } from 'zod';

const updateUserZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    username: z.string().optional(),

    contactNo: z.string().optional(),

    email: z.string().optional(),

    role: z.string().optional(),

    profileImg: z.string().optional(),

    address: z.string().optional(),
    password: z.string().optional(),
  }),
});

export const UserValidation = {
  updateUserZodSchema,
};
