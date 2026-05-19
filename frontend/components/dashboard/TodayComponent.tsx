"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { useCreateTask } from "@/hooks/useTaskMutations"

const TodayComponent = () => {
    const [taskTitle, setTaskTitle] = useState("")
    const { mutate: createTask } = useCreateTask()

    const addTask = () => {
        createTask({
            title: taskTitle,
            description: "This is a description of the task.",
            dueDate: new Date().toISOString(),
            completed: false
        })
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center mt-10 gap-5">
                <div className="w-120 flex items-center gap-4">
                    <Input
                        type="text"
                        placeholder="Add a new task..."
                        className="px-4 py-5.5 rounded-md text-xs!"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                    <Button onClick={addTask} className="text-xs" type="submit">
                        Add Task
                    </Button>
                </div>
            </div>
            <div className="space-y-5 mt-10">
                <h1 className="text-3xl font-bold">Tasks</h1>
                <ul>
                    <li className="flex items-center gap-4 border-2 rounded-lg py-3 px-5">
                        <Checkbox className="w-5 h-5" />
                        <div>
                            <h2 className="text-md font-semibold">Task1</h2>
                            <p className="text-xs text-gray-500">This is a description of Task1.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default TodayComponent