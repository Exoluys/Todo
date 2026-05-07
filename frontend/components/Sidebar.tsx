import { Calendar, CircleCheck, Logs, Sun } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"

const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader className="pt-15 items-center">
                <h1 className="text-2xl font-bold mb-4">Todo</h1>
            </SidebarHeader>
            <SidebarContent className="mt-8">
                <SidebarGroup className="space-y-2">
                    <SidebarGroupLabel>WORK</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Sun className="h-5! w-5!" />
                                    Today
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Calendar className="h-5! w-5!" />
                                    Upcoming
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Logs className="h-5! w-5!" />
                                    All tasks
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
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