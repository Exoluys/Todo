import z from "zod";

export const RegisterSchema = z.object({
    email: z.email(),
    username: z.string().min(1, "Username should be at least 1 character long.").max(20, "Username should be less than 20 characters long."),
    password: z.string().min(8, "Password should be at least 8 characters long.")
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>