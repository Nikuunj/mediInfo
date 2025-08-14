import { email, z } from "zod";


export const SignInUserSchema = z.object({
    email: z.string().min(3).max(20).email(),
    password: z.string().min(6).max(100)
})

export const ItemSchema = z.object({
    name: z.string().min(2),
    description: z.string().min(20),
    UseOf: z.string().min(10),
    url: z.string().url(),
})


export type signinType = z.infer<typeof SignInUserSchema>
export type itemType = z.infer<typeof ItemSchema>