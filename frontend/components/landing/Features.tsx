import { cn } from "@/lib/utils"
import { Calendar, CircleCheck, Logs } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { fraunces } from "@/lib/fonts"

const features = [
    {
        icon: <Logs className="h-6 w-6 text-[#1D9E75]" />,
        title: "All your tasks, one place",
        description: "Create and manage tasks across all your projects without switching between apps."
    },
    {
        icon: <Calendar className="h-6 w-6 text-[#1D9E75]" />,
        title: "Plan ahead",
        description: "Schedule tasks for today or upcoming days so you always know what's next."
    },
    {
        icon: <CircleCheck className="h-6 w-6 text-[#1D9E75]" />,
        title: "Track progress",
        description: "Mark tasks as done and watch your completed list grow. Stay motivated every day."
    },
]

const Features = () => {
    return (
        <div className="min-h-screen flex flex-1 flex-col justify-center items-center gap-6">
            <div className="flex flex-col items-center gap-3">
                <h3 className="text-[#1D9E75] text-2xl">WHY US</h3>
                <h2 className={cn("text-4xl md:text-5xl lg:text-6xl text-center", fraunces.className)}>
                    Everything you need,
                    <br /> <span className="italic">nothing you don&#39;t</span>
                </h2>
                <p className="text-muted-foreground text-center">
                    Built for focus. Designed to get out of your way.
                </p>
            </div>
            <div className="grid grid-cols-3 gap-4 w-full max-w-5xl px-10">
                {features.map((feature, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>
                                {feature.icon} {feature.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-[13px]">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Features