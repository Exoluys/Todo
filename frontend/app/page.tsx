import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import TaskComponent from "@/components/TaskComponent"

const page = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="px-10 w-full">
                <Navbar />
                <TaskComponent />
            </div>
        </div>
    )
}

export default page