"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { useCreateTask, useDeleteTask, useTask, useUpdateTask } from "@/hooks/useTaskMutations"
import { CalendarIcon, Trash2 } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { Tasks } from "@/lib/types"
import { Spinner } from "../ui/spinner"
import { toast } from "sonner"
import { Badge } from "../ui/badge"

const TodayComponent = () => {
    const [taskTitle, setTaskTitle] = useState("")
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    const { mutate: createTask } = useCreateTask()
    const { mutate: updateTask } = useUpdateTask()
    const { mutate: deleteTask } = useDeleteTask()
    const { data: tasks, isLoading, isError } = useTask()

    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const todayEnd = new Date(todayStart)
    todayEnd.setDate(todayEnd.getDate() + 1)

    const overdueTasks = tasks?.filter(task => new Date(task.due_date) < todayStart && !task.is_complete)
    const highTasks = tasks?.filter(task => {
        const due = new Date(task.due_date)
        return due >= todayStart && due < todayEnd && !task.is_complete
    })

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
                }}
                className="ml-auto"
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </li>
    )

    const addTask = () => {
        if (!taskTitle.trim()) {
            toast.error("Task title cannot be empty.")
            return
        }

        createTask({
            title: taskTitle,
            due_date: selectedDate?.toISOString(),
            is_complete: false
        })
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center mt-10 gap-5">
                <div className="w-120 flex items-center gap-4">
                    <InputGroup className="px-4 py-5.5 rounded-md">
                        <InputGroupInput
                            type="text"
                            placeholder="Add a new task..."
                            className="text-xs!"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                        />

                        <InputGroupAddon align="inline-end">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button type="button">
                                        <CalendarIcon className="w-4 h-4" />
                                    </button>
                                </ PopoverTrigger>
                                <PopoverContent>
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={(date) => setSelectedDate(date ?? new Date())}
                                        disabled={{ before: new Date() }}
                                        className="min-w-full"
                                    />
                                </PopoverContent>
                            </Popover>
                        </InputGroupAddon>
                    </InputGroup>

                    <Button onClick={addTask} className="text-xs" type="submit">
                        Add Task
                    </Button>
                </div>
            </div>
            <div className="space-y-5 mt-10">
                <h1 className="text-3xl font-bold">Today&#39;s Tasks</h1>
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
                    ) : (
                        tasks && tasks.length === 0 ? (
                            <div className="flex flex-col justify-center items-center py-10 gap-2">
                                <p className="text-sm text-muted-foreground">No tasks for today. Enjoy your day!</p>
                            </div>
                        ) : (
                            <>
                                {overdueTasks && overdueTasks.length > 0 && (
                                    <>
                                        <h3 className="text-sm font-semibold text-red-500">Overdue</h3>
                                        {overdueTasks.map((task) => taskItem(task, <Badge variant="destructive" className="text-xs">Overdue</Badge>))}
                                    </>
                                )}
                                {highTasks && highTasks.length > 0 && (
                                    <>
                                        <h3 className="text-sm font-semibold text-orange-500">Today</h3>
                                        {highTasks.map((task) => taskItem(task, <Badge className="bg-yellow-50 text-orange-500 dark:bg-yellow-950 dark:text-yellow-300 text-xs">High</Badge>))}
                                    </>
                                )}
                            </>
                        )
                    )}
                </ul>
            </div>
        </>
    )
}

export default TodayComponent