import { api } from "@/lib/api"
import { Tasks } from "@/lib/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useTask = () => {
    return useQuery({
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
        onError: () => toast.error("Failed to create task.")
    })
}

export const useUpdateTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: number, data: Partial<Tasks> }) => api.patch(`tasks/${id}/`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
            toast.success("Task updated successfully!")
        },
        onError: () => toast.error("Failed to update task.")
    })
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => api.delete(`tasks/${id}/`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
            toast.success("Task deleted successfully!")
        },
        onError: () => toast.error("Failed to delete task.")
    })
}