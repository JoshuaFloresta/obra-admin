import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET (
    req:Request,
    { params }:{ params:{  artistId:string }}
){
    try{

        const artist = await prismadb.artist.findUnique({
            where:{
                id:params.artistId,
            }
        })

        return NextResponse.json(artist)

    }catch(error){
    console.log('[ARTIST_GET]',error); 
    return new NextResponse("Internal error",{ status:500 });
    }
};


export async function PATCH (
    req:Request,
    { params }:{params:{ storeId:string, artistId:string }}
){
    try{
        const { userId } = auth();
        const body =await req.json();

        const {name, imageUrl} = body;
        
        if(!userId){
            return new NextResponse("Unauthenticated",{status:401});
        }

        if(!name){
            return new NextResponse("name is required",{status:400});
        }

        if(!imageUrl){
            return new NextResponse("ImageUrl is required",{status:400});
        }
        
        
        if(!params.artistId){
            return new NextResponse("artist ID is required", {status:400})
        }
        

        const storeByUserId = await prismadb.store.findFirst({
        where: {
            id:params.storeId,
            userId
        }
    });

    if(!storeByUserId) {
        return new NextResponse("Unauthorized",{ status:403 });
    }

        const artist = await prismadb.artist.updateMany({
            where:{
                id:params.artistId,
            },
            data:{
                name,
                imageUrl,
            }
        })

        return NextResponse.json(artist)

    }catch(error){
    console.log('[ARTIST_PATCH]',error); 
    return new NextResponse("Internal error",{ status:500 });
    }
};


export async function DELETE (
    req:Request,
    { params }:{ params:{storeId:string , artistId:string }}
){
    try{
        const { userId } = auth();
        
        if(!userId){
            return new NextResponse("Unauthenticated",{status:401});
        }
        
        if(!params.artistId){
            return new NextResponse("Artist ID is required", {status:400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id:params.storeId,
                userId
            }
        });
    
        if(!storeByUserId) {
            return new NextResponse("Unauthorized",{ status:403 });
        }
        
        
        const artist = await prismadb.artist.deleteMany({
            where:{
                id:params.artistId,
            }
        })

        return NextResponse.json(artist)

    }catch(error){
    console.log('[ARTIST_DELETE]',error); 
    return new NextResponse("Internal error",{ status:500 });
    }
};

