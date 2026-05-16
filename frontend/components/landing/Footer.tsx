import Link from "next/link"

const Footer = () => {
    return (
        <footer className="py-6 px-10 flex flex-col items-center justify-center">
            <p className="text-sm text-muted-foreground">© 2026 ToDo List. All rights reserved.</p>
            <div className="flex items-center gap-5 text-sm text-muted-foreground">
                <Link href="#">Privacy</Link>
                <Link href="#">Terms</Link>
                <Link href="https://github.com/Exoluys/Todo">GitHub</Link>
            </div>
        </footer>
    )
}

export default Footer