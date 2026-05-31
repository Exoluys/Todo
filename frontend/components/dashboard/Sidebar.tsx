"use client"

import { CircleCheck, Logs, Sun } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { usePathname, useRouter } from "next/navigation"

const AppSidebar = () => {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <Sidebar>
            <SidebarHeader className="pt-15 items-center">
                <h1 className="text-2xl font-bold mb-4">Todo</h1>
            </SidebarHeader>
            <SidebarContent className="mt-8">
                <SidebarGroup className="space-y-2">
                    <SidebarGroupLabel>TASKS</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    className={pathname === "/dashboard/myTask" ? "bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground" : ""}
                                    onClick={() => { router.push("/dashboard/myTask") }}
                                >
                                    <Sun className="h-5! w-5!" />
                                    My Tasks
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    className={pathname === "/dashboard/allTask" ? "bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground" : ""}
                                    onClick={() => { router.push("/dashboard/allTask") }}
                                >
                                    <Logs className="h-5! w-5!" />
                                    All Tasks
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    className={pathname === "/dashboard/completed" ? "bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground" : ""}
                                    onClick={() => { router.push("/dashboard/completed") }}
                                >
                                    <CircleCheck className="h-5! w-5!" />
                                    Completed
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar >
    )
}

export default AppSidebar