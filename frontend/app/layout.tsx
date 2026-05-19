import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import AppProvider from "@/providers/appProvider";
import { poppins } from "@/lib/fonts";

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
                    {children}
                </AppProvider>
            </body>
        </html >
    );
}
