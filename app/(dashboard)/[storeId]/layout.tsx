import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";

export default async function DashboardLayout({
    children,
    params
}:{
    children: React.ReactNode;  // The content of the page that you want to display in your dashboard layout component (e.g., a
    params: { storeId:string }
}) {
    const { userId } = auth();
    if(!userId){
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where:{
            id:params.storeId,
            userId
        }
    });

    if(!store){
        redirect('/');
    }

    return(
        <>
            <Navbar/>
            {children}
        </>
    )
}

