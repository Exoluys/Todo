"use client"

import { Calendar, CircleCheck, Logs, Sun } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { usePathname } from "next/navigation"

const AppSidebar = () => {
    const pathname = usePathname()
    console.log(pathname)

    return (
        <Sidebar>
            <SidebarHeader className="pt-15 items-center">
                <h1 className="text-2xl font-bold mb-4">Todo</h1>
            </SidebarHeader>
            <SidebarContent className="mt-8">
                <SidebarGroup className="space-y-2">
                    <SidebarGroupLabel>WORK</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    className={pathname === "/dashboard/today" ? "bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground" : ""}
                                >
                                    <Sun className="h-5! w-5!" />
                                    Today
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    className={pathname === "/dashboard/upcoming" ? "bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground" : ""}
                                >
                                    <Calendar className="h-5! w-5!" />
                                    Upcoming
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    className={pathname === "/dashboard/all" ? "bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground" : ""}
                                >
                                    <Logs className="h-5! w-5!" />
                                    All tasks
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    className={pathname === "/dashboard/completed" ? "bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground" : ""}
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