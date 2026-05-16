import type { Metadata } from "next";
import { Fraunces, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AppProvider from "@/providers/appProvider";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const fraunces = Fraunces({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
})

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
