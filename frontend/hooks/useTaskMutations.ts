import { api } from "@/lib/api"
import { Tasks } from "@/lib/types"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"

export const useTask = () => {
    return useQuery({
        queryKey: ["tasks"],
        queryFn: () => api.get("tasks").then(res => res.data)
    })
}

export const useCreateTask = () => {
    const queryClient = new QueryClient()
    return useMutation({
        mutationFn: (data: Tasks) => api.post("tasks", data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
        }
    })
}

export const useUpdateTask = () => {
    const queryClient = new QueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: number, data: Partial<Tasks> }) => api.patch(`tasks/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
        }
    })
}

export const useDeleteTask = () => {
    const queryClient = new QueryClient()
    return useMutation({
        mutationFn: (id: number) => api.delete(`tasks/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
        }
    })
}