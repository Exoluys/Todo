import { api } from "@/lib/api"
import { Tasks } from "@/lib/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

const handleError = (e: unknown, fallback: string) => {
    if (axios.isAxiosError(e)) {
        const errorMessage = e.response?.data?.detail || fallback
        toast.error(errorMessage)
    } else {
        toast.error("An unexpected error occurred.")
    }
}

export const useTask = () => {
    return useQuery<Tasks[]>({
        queryKey: ["tasks"],
        queryFn: () => api.get("tasks/").then(res => res.data)
    })
}

export const useCreateTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: Tasks) => api.post("tasks/", data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
            toast.success("Task created successfully!")
        },
        onError: (e: unknown) => handleError(e, "Failed to create task.")
    })
}

export const useUpdateTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: number, data: Partial<Tasks> }) => api.patch(`tasks/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
        },
        onError: (e: unknown) => handleError(e, "Failed to update task.")
    })
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => api.delete(`tasks/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
            toast.success("Task deleted successfully!")
        },
        onError: (e: unknown) => handleError(e, "Failed to delete task.")
    })
}