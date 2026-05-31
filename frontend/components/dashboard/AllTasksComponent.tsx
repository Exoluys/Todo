"use client"

import { useDeleteTask, useTask, useUpdateTask } from "@/hooks/useTaskMutations"
import { Spinner } from "../ui/spinner"
import { Tasks } from "@/lib/types"
import { Checkbox } from "../ui/checkbox"
import { toast } from "sonner"
import { Badge } from "../ui/badge"
import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"

const AllTasksComponent = () => {
    const { data: tasks, isLoading, isError } = useTask()
    const { mutate: updateTask } = useUpdateTask()
    const { mutate: deleteTask } = useDeleteTask()

    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const todayEnd = new Date(todayStart)
    todayEnd.setDate(todayEnd.getDate() + 1)

    const overdueTasks = tasks?.filter(task => new Date(task.due_date) < todayStart && !task.is_complete)
    const highTasks = tasks?.filter(task => {
        const due = new Date(task.due_date)
        return due >= todayStart && due < todayEnd && !task.is_complete
    })
    const medTasks = tasks?.filter(task => task.priority === "Med" && new Date(task.due_date) >= todayEnd && !task.is_complete)
    const lowTasks = tasks?.filter(task => task.priority === "Low" && !task.is_complete)

    const taskItem = (task: Tasks, badge: React.ReactNode) => (
        <li key={task.id} className="flex items-center gap-4 border-2 rounded-lg py-3 px-5">
            <Checkbox
                className="w-5 h-5"
                onCheckedChange={(checked) => {
                    updateTask({ id: task.id!, data: { is_complete: !!checked } })
                    toast.success(checked ? "Task marked as completed!" : "Task marked as incomplete.")
                }}
            />
            <div className="flex flex-col">
                <div className="flex gap-3 items-center">
                    <h2 className="text-md font-semibold">{task.title}</h2>
                    {badge}
                </div>
                <p className="text-xs text-muted-foreground">
                    Due {new Date(task.due_date).toLocaleDateString()}
                </p>
            </div>
            <Button
                type="button"
                variant="destructive"
                onClick={() => {
                    deleteTask(task.id!)
                    toast.success("Task deleted.")
                }}
                className="ml-auto"
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </li>
    )

    return (
        <>
            <div className="space-y-5 mt-10">
                <h1 className="text-3xl font-bold">All Tasks</h1>
                <ul className="flex flex-col justify-center gap-5">
                    {isLoading ? (
                        <div className="flex flex-col justify-center items-center py-10 gap-2">
                            <Spinner className="w-6 h-6" />
                            <p className="text-sm text-muted-foreground">Loading tasks...</p>
                        </div>
                    ) : isError ? (
                        <div className="flex flex-col justify-center items-center py-10 gap-2">
                            <p className="text-sm text-muted-foreground">Failed to fetch tasks.</p>
                        </div>
                    ) : tasks && tasks.length === 0 ? (
                        <div className="flex flex-col justify-center items-center py-10 gap-2">
                            <p className="text-sm text-muted-foreground">No tasks. Enjoy your day!</p>
                        </div>
                    ) : (
                        <>
                            {overdueTasks && overdueTasks.length > 0 && (
                                <>
                                    <h3 className="text-sm font-semibold text-red-500">Overdue</h3>
                                    {overdueTasks.map(task => taskItem(task, <Badge variant="destructive">Overdue</Badge>))}
                                </>
                            )}
                            {highTasks && highTasks.length > 0 && (
                                <>
                                    <h3 className="text-sm font-semibold text-orange-500">Today</h3>
                                    {highTasks.map(task => taskItem(task, <Badge className="bg-yellow-50 text-orange-500 dark:bg-yellow-950 dark:text-yellow-300">High</Badge>))}
                                </>
                            )}
                            {medTasks && medTasks.length > 0 && (
                                <>
                                    <h3 className="text-sm font-semibold text-yellow-500">Upcoming</h3>
                                    {medTasks.map(task => taskItem(task, <Badge className="bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">Medium</Badge>))}
                                </>
                            )}
                            {lowTasks && lowTasks.length > 0 && (
                                <>
                                    <h3 className="text-sm font-semibold text-green-500">Later</h3>
                                    {lowTasks.map(task => taskItem(task, <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">Low</Badge>))}
                                </>
                            )}
                        </>
                    )}
                </ul>
            </div>
        </>
    )
}

export default AllTasksComponent