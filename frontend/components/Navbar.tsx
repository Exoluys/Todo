"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { useAuth } from "@/context/AuthContext"
import { Spinner } from "./ui/spinner"

const Navbar = () => {
    const { user, loading } = useAuth()

    if (loading) <Spinner />

    return (
        <div className="flex items-center justify-between h-10">
            <h1 className="text-2xl font-bold">ToDo List</h1>

            <div className="space-x-1.5">
                {!user ? (
                    <>
                        <Button variant="outline" asChild>
                            <Link href="/auth/login" className="text-xs">
                                Login
                            </Link>
                        </Button>

                        <Button asChild>
                            <Link href="/auth/register" className="text-xs">
                                Register
                            </Link>
                        </Button>
                    </>
                ) : (
                    <>
                        <Button size="icon" className="rounded-4xl">
                            {user.username[0].toUpperCase()}
                        </Button>
                    </>
                )}

            </div>
        </div>
    )
}

export default Navbar