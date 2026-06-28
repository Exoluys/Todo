"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { useAuth } from "@/context/AuthContext"
import { Spinner } from "./ui/spinner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useLogout } from "@/hooks/useAuthMutations"
import { useRouter } from "next/navigation"

const Navbar = () => {
    const { user, loading } = useAuth()
    const { mutate: logout } = useLogout()
    const router = useRouter()

    if (loading) return <Spinner />

    return (
        <div className="flex items-center justify-between h-10">
            <h1 className="text-2xl font-bold">ToDo List</h1>

            <div className="space-x-1.5">
                {!user ? (
                    <>
                        <Button variant="outline" asChild>
                            <Link href="/auth/login" className="text-xs py-5 px-4">
                                Login
                            </Link>
                        </Button>

                        <Button asChild>
                            <Link href="/auth/register" className="text-xs py-5 px-4">
                                Register
                            </Link>
                        </Button>
                    </>
                ) : (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="icon">
                                    {user.username[0].toUpperCase()}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="rounded-xl" align="end">
                                <DropdownMenuItem
                                    className="hover:rounded-xl pl-5"
                                    onSelect={() => {
                                        router.push("/dashboard/myTask")
                                    }}
                                >
                                    Dashboard
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="hover:rounded-xl pl-5"
                                    onSelect={() => {
                                        logout()
                                    }}
                                >
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                )}

            </div>
        </div>
    )
}

export default Navbar