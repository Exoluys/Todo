import z from "zod";

export const RegisterSchema = z.object({
    email: z.email(),
    username: z.string().min(1).max(20),
    password: z.string().min(8)
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>