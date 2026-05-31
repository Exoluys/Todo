"use client"

import { useDeleteTask, useTask, useUpdateTask } from "@/hooks/useTaskMutations"
import { Spinner } from "../ui/spinner"
import { Checkbox } from "../ui/checkbox"
import { toast } from "sonner"
import { Tasks } from "@/lib/types"
import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"

const CompletedTasks = () => {
    const { data: tasks, isLoading, isError } = useTask()
    const { mutate: updateTask } = useUpdateTask()
    const { mutate: deleteTask } = useDeleteTask()

    const completedTasks = tasks?.filter(task => task.is_complete)

    return (
        <div className="mt-10 space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Completed</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    {completedTasks?.length ?? 0} task{completedTasks?.length !== 1 ? "s" : ""} completed
                </p>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center py-10 gap-2">
                    <Spinner className="w-6 h-6" />
                    <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
            ) : isError ? (
                <p className="text-sm text-muted-foreground">Failed to fetch tasks.</p>
            ) : completedTasks?.length === 0 ? (
                <div className="flex flex-col items-center py-10 gap-2">
                    <p className="text-sm text-muted-foreground">Nothing completed yet. Get to work!</p>
                </div>
            ) : (
                <ul className="flex flex-col gap-3">
                    {completedTasks?.map((task: Tasks) => (
                        <li key={task.id} className="flex items-center justify-between gap-4 px-5 py-3 rounded-lg border bg-muted/40">
                            <div className="flex items-center gap-4">
                                <Checkbox
                                    checked={true}
                                    className="opacity-50"
                                    onCheckedChange={() => {
                                        updateTask({ id: task.id!, data: { is_complete: false } })
                                        toast.success("Task marked as incomplete.")
                                    }}
                                />
                                <div>
                                    <p className="text-sm line-through text-muted-foreground">{task.title}</p>
                                    <p className="text-xs text-muted-foreground/60">
                                        Due {new Date(task.due_date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => {
                                    deleteTask(task.id!)
                                }}
                                className="ml-auto"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CompletedTasks