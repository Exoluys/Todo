import { AuthProvider } from "@/context/AuthContext"

const appProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <AuthProvider>
                {children}
            </AuthProvider>
        </>
    )
}

export default appProvider