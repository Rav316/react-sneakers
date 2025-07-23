import { z } from 'zod';

export const formLoginSchema = z.object({
  email: z.email({ message: 'Некорректный email' }),
  password: z
    .string()
    .min(4, { message: 'Пароль должен содержать не менее 4 символов' }),
});

export const formRegisterSchema = formLoginSchema.extend({
  name: z
    .string()
    .min(2, { message: 'Имя должно содержать не менее 2 символов' }),
});

export type LoginData = z.infer<typeof formLoginSchema>;
export type RegisterData = z.infer<typeof formRegisterSchema>;