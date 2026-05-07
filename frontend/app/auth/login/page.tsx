"use client"

import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { loginSchema, LoginSchemaType } from "@/lib/schema/login.schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldSet, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

const Page = () => {
    const { login } = useAuth()

    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (data: LoginSchemaType) => {
        login(data)
    }

    return (
        <>
            <Button variant="outline" className="w-30 p-6 m-4 absolute" asChild>
                <Link href="/" className="flex items-center gap-2 group">
                    <ArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
                    Back
                </Link>
            </Button>
            <div className="w-full h-screen flex flex-col items-center justify-center">
                <Card className="w-115 flex items-center shadow-2xl gap-2">
                    <CardTitle className="text-[26px] font-bold mt-2">LOGIN</CardTitle>
                    <CardDescription>Welcome back! Please login to continue</CardDescription>
                    <CardContent className="w-100 h-full flex items-center justify-center">
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                            <FieldSet className="flex flex-col gap-4">
                                <Field className="gap-2">
                                    <FieldLabel>Email</FieldLabel>
                                    <Input
                                        type="email"
                                        placeholder="you@example.com"
                                        {...form.register("email")}
                                        className="rounded-md text-xs!"
                                    />
                                    <FieldError>{form.formState.errors.email?.message}</FieldError>
                                </Field>
                                <Field className="gap-2">
                                    <FieldLabel>Password</FieldLabel>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        {...form.register("password")}
                                        className="rounded-md text-xs!"
                                    />
                                    <FieldError>{form.formState.errors.password?.message}</FieldError>
                                </Field>
                            </FieldSet>
                            <div className="w-full flex flex-col items-center justify-center gap-2 mt-2">
                                <Button type="submit" className="w-40 h-10">Login</Button>
                                <CardFooter className="text-sm text-muted-foreground gap-1">
                                    Don&#39;t have an account? <Link href="register" className="text-blue-500 hover:underline">Register</Link>
                                </CardFooter>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Page