import { cn } from "@/lib/utils"
import Navbar from "../Navbar"
import { Button } from "../ui/button"
import Link from "next/link"
import { fraunces } from "@/lib/fonts"

const Hero = () => {
    return (
        <div className="min-h-screen flex flex-col flex-1">
            <div className="absolute top-0 left-0 right-0 m-6">
                <Navbar />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center gap-5">
                <h2 className={cn("text-4xl md:text-5xl lg:text-6xl text-center", fraunces.className)}>
                    The last to-do list <br /> you&#39;ll{" "}
                    <span className="text-[#1D9E75] italic">ever need</span>
                </h2>

                <p className="w-[25%] text-muted-foreground text-center text-sm">
                    Stop juggling apps. One calm, beautiful place to capture tasks, stay focused, and actually get things done.
                </p>

                <Button asChild>
                    <Link href="/signup">Get Started</Link>
                </Button>
            </div>
        </div>
    )
}

export default Hero