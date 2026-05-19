import AppSidebar from "@/components/dashboard/Sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 min-h-screen">
                <SidebarTrigger />
                <div className="px-10 w-full">
                    {children}
                </div>
            </main>
        </SidebarProvider >
    )
}

export default layout