"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { useCreateTask, useTask } from "@/hooks/useTaskMutations"
import { CalendarIcon } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { Tasks } from "@/lib/types"
import { Spinner } from "../ui/spinner"

const TodayComponent = () => {
    const [taskTitle, setTaskTitle] = useState("")
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    const { mutate: createTask } = useCreateTask()
    const { data: tasks, isLoading, isError } = useTask()

    const addTask = () => {
        createTask({
            title: taskTitle,
            due_date: selectedDate?.toISOString(),
            completed: false
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
                <h1 className="text-3xl font-bold">Tasks</h1>
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
                            tasks?.map((task: Tasks) => (
                                <li key={task.id} className="flex items-center gap-4 border-2 rounded-lg py-3 px-5">
                                    <Checkbox className="w-5 h-5" />
                                    <div>
                                        <h2 className="text-md font-semibold">{task.title}</h2>
                                    </div>
                                </li>
                            ))
                        )
                    )}
                </ul>
            </div>
        </>
    )
}

export default TodayComponent