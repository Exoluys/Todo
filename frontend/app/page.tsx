import Navbar from "@/components/Navbar"
import TaskComponent from "@/components/TaskComponent"

const page = () => {
    return (
        <div className="px-10 w-full">
            <Navbar />
            <TaskComponent />
        </div>
    )
}

export default page