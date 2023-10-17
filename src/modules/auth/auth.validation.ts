import { z } from 'zod';
const createUserZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    name: z.string({
      required_error: ' Name is required',
    }),
    username: z.string({
      required_error: 'User  Name is required',
    }),

    contactNo: z.string({
      required_error: 'contact Number is required',
    }),

    email: z.string({
      required_error: 'Email is required',
    }),

    role: z.string().optional(),

    address: z.string({
      required_error: 'Address is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
export const authValidation = {
  createUserZodSchema,
};
