"use client"

import { CircleCheck, LogOut, Logs, Sun } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

const AppSidebar = () => {
    const pathname = usePathname()
    const router = useRouter()

    const { user, loading } = useAuth()

    if (loading) return null

    return (
        <Sidebar>
            <SidebarHeader className="pt-15 items-center">
                <h1 className="text-2xl font-bold mb-4">Todo</h1>
            </SidebarHeader>
            <SidebarContent className="my-8 flex justify-between">
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
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton className="py-6">
                                            <div className="size-9 shrink-0 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center">
                                                {user?.username?.[0]?.toUpperCase()}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">{user?.username}</span>
                                                <span className="text-xs text-muted-foreground">{user?.email}</span>
                                            </div>
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="rounded-xl">
                                        <DropdownMenuItem className="hover:rounded-xl pl-5">
                                            <LogOut />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar >
    )
}

export default AppSidebar