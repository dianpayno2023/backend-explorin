import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    email: z
      .string({ error: 'Email is required' })
      .min(1, 'Email cannot be empty')
      .max(100, 'Email is too long'),
    password: z
      .string({ error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters')
      .max(10, 'Password must be at most 10 characters'),
    name: z
      .string({ error: 'Name is required' })
      .min(1, 'Name cannot be empty')
      .max(100, 'Name is too long'),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z
      .string({ error: 'Email is required' })
      .min(1, 'Email cannot be empty')
      .max(100, 'Email is too long'),
    password: z
      .string({ error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters')
      .max(10, 'Password must be at most 10 characters'),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z
      .string()
      .min(1, 'Name cannot be empty')
      .max(100, 'Name is too long')
      .optional(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(10, 'Password must be at most 10 characters')
      .optional(),
  });
}
