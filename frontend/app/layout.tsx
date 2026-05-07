import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AppProvider from "@/providers/appProvider";
import { Toaster } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Todo App",
    description: "Track your tasks and stay organized with our Todo App. Create, manage, and prioritize your to-do lists effortlessly.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn("h-full", "antialiased", poppins.className)}
            suppressHydrationWarning
        >
            <body className="min-h-full flex flex-col">
                <AppProvider>
                    <SidebarProvider>
                        <Sidebar />
                        <main className="flex-1 min-h-screen">
                            <SidebarTrigger />
                            <div className="px-10 w-full">
                                <Navbar />
                                {children}
                            </div>
                            <Toaster position="top-right" />
                        </main>
                    </SidebarProvider>
                </AppProvider>
            </body>
        </html >
    );
}
