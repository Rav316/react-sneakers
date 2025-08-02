import { z } from 'zod';

export const formProfileSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Имя должно содержать не менее 2 символов' })
      .max(32, { message: 'Имя должно содержать не более 32 символов' }),
    email: z.email({ message: 'Некорректный email' }),
    password: z
      .string()
      .min(4, {
        message: 'Пароль должен содержать не менее 4 символов',
      })
      .optional()
      .or(z.literal('')),
    newPassword: z
      .string()
      .min(4, {
        message: 'Новый пароль должен содержать не менее 4 символов',
      })
      .optional()
      .or(z.literal('')),
  })
  .refine(
    (data) =>
      !(data.password || data.newPassword) ||
      data.newPassword !== data.password,
    {
      message: 'Новый пароль не должен совпадать со старым',
      path: ['newPassword'],
    },
  );

export type ProfileData = z.infer<typeof formProfileSchema>;
