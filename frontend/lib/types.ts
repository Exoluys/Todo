export type User = {
    id: number
    email: string
    username: string
    password: string
}

export type LoginData = {
    email: string
    password: string
}

export type RegisterData = {
    email: string
    username: string
    password: string
}

export type Tasks = {
    id?: number
    title: string
    priority?: "Low" | "Med" | "High"
    due_date: string
    is_complete: boolean
}