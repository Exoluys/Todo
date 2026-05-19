import AppSidebar from "@/components/dashboard/Sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "sonner"

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 min-h-screen">
                <SidebarTrigger />
                <div className="px-10 w-full">
                    {children}
                </div>
                <Toaster position="top-right" />
            </main>
        </SidebarProvider >
    )
}

export default layout