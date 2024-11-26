import { z } from 'zod'


export const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password is required. 8 is minimum length' }),
})

export const loginSchema = authSchema;
export const registerSchema = authSchema.extend({
    name: z.string().min(4, { message: 'Name is required' }),
})

export type LoginSchema = z.output<typeof loginSchema>;
export type RegisterSchema = z.output<typeof registerSchema>;
