import Link from "next/link"
import { Button } from "./ui/button"

const Navbar = () => {
    return (
        <div className="flex items-center justify-end w-full h-10 mt-3">
            <div className="space-x-1.5">
                <Button variant="outline" asChild><Link href="/auth/login" className="text-xs">Login</Link></Button>
                <Button asChild><Link href="/auth/register" className="text-xs">Register</Link></Button>
            </div>
        </div>
    )
}

export default Navbar