import { api } from "@/lib/api"
import { LoginData, RegisterData } from "@/lib/types"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useRegister = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: (data: RegisterData) => api.post("auth/register", data),
        onSuccess: () => {
            toast.success("Account created successfully!")
            router.push("/login")
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Signup failed")
            } else {
                toast.error("Something went wrong")
            }
        }
    })
}

export const useLogin = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: (data: LoginData) => api.post("auth/login", data),
        onSuccess: () => {
            toast.success("Login successful!")
            router.push("/dashboard")
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Login failed")
            } else {
                toast.error("Something went wrong")
            }
        }
    })
}

export const useLogout = () => {
    return useMutation({
        mutationFn: () => api.post("auth/logout"),
        onSettled: () => {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Logout failed")
            } else {
                toast.error("Something went wrong")
            }
        }
    })
}

