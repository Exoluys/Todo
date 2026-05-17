"use client"

import { api } from "@/lib/api";
import { LoginData, RegisterData, User } from "@/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useState } from "react";
import { toast } from "sonner";

type AuthContextType = {
    user: User | null
    loading: boolean
    register: (data: RegisterData) => Promise<void>
    login: (data: LoginData) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const register = useCallback(async (data: RegisterData) => {
        try {
            const res = await api.post("auth/register", data)
            setUser(res.data.user)
            toast.success("Account created successfully!")
            router.push("/dashboard/today")
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Signup failed")
            } else {
                toast.error("Something went wrong")
            }
        }
    }, [router])

    const login = useCallback(async (data: LoginData) => {
        try {
            const res = await api.post("auth/login", data)
            localStorage.setItem("token", res.data.token)
            setUser(res.data.user)
            router.push("/")
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Login failed")
            } else {
                toast.error("Something went wrong")
            }
        }
    }, [router])

    const logout = useCallback(() => {
        try {
            api.post("auth/logout")
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Logout failed")
            } else {
                toast.error("Something went wrong")
            }
        }
        finally {
            localStorage.removeItem("token")
            setUser(null)
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                register,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}