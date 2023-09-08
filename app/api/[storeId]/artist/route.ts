import prismadb from "@/lib/prismadb";

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req:Request,
    {params}:{params:{storeId:string}}
){
    try{
        const { userId } = auth();
        const body = await req.json();

        const {name , imageUrl} = body;

        if(!userId){
            return new NextResponse("Unauthenticated", {status:401});
        }

        if(!name){
            return new NextResponse("Name is required", {status:401});
        }

        if(!imageUrl){
            return new NextResponse("Image URL is  required", {status:400});
    }

    if(!params.storeId){
        return new NextResponse("StoreId is  required", {status:400});
    }

    const storeByUserId = await prismadb.store.findFirst({
        where: {
            id:params.storeId,
            userId
        }
    });
    
    if(!storeByUserId){
        return new NextResponse("Unauhtorized",{status:403});
    }
    

    const artist = await prismadb.artist.create({
        data: {
            name,
            imageUrl,
            storeId:params.storeId
        }
    });

    return NextResponse.json(artist);
    } catch(error){
        console.log('ARTISTS_POST]',error);
        return new NextResponse("internal error",{status:500});
    }
};

export async function GET(
    req:Request,
    {params}:{params:{storeId:string}}
){
    try{

    if(!params.storeId){
        return new NextResponse("StoreId is  required", {status:400});
    }

    const artist = await prismadb.artist.findMany({
       where:{
        storeId: params.storeId,
       }
    });

    return NextResponse.json(artist);
    } catch(error){
        console.log('ARTISTS_GET]',error);
        return new NextResponse("internal error",{status:500});
    }
};