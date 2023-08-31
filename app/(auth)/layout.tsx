export default function AuthLayout({
    children
}: {
    children:React.ReactNode
}){
    return (
    <div className="flex items-center align-middle justify-center min-h-full">
        {children}
    </div>
        )
}
