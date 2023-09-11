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

        const {
         name,
         description,
         price,
         categoryId,
         colorId,
         sizeId,
         images,
         isFeatured,
         isArchived,
         artistId,
         
        } = body;

        if(!userId){
            return new NextResponse("Unauthenticated", {status:401});
        }

        if(!name){
            return new NextResponse("Name is required", {status:401});
        }

        if(!images || !images.length){
            return new NextResponse("Images are Required",{status: 404});
        }

        if(!price){
            return new NextResponse("Price is  required", {status:400});
    }

    if(!categoryId){
        return new NextResponse("Category ID is required", {status:400});
    }  

    if(!sizeId){
        return new NextResponse("Size ID is required", {status:400});
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
    

    const product = await prismadb.product.create({
        data: {
            name,
            description,
            price,
            isFeatured,
            isArchived,
            categoryId,
            sizeId,
            storeId:params.storeId,
            colorId,
            artistId,
            images:{
                createMany:{
                    data:[
                        ...images.map((image:{ url:String }) => image)
                    ]
                }
            }
        }
    });

    return NextResponse.json(product);
    } catch(error){
        console.log('PRODUCTS_POST]',error);
        return new NextResponse("internal error",{status:500});
    }
};

export async function GET(
    req:Request,
    {params}:{params:{storeId:string}}
){
    try{

        const { searchParams } = new URL(req.url)
        const categoryId = searchParams.get("categoryId") ||undefined;
        const sizeId = searchParams.get("sizeId") ||undefined;
        const colorId = searchParams.get("colorId") ||undefined;
        const isFeatured = searchParams.get("isFeatured") ||undefined;
        const artistId = searchParams.get("artistId") ||undefined;


        if(!params.storeId){
        return new NextResponse("StoreId is  required", {status:400});
    }

    const product = await prismadb.product.findMany({
       where:{
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        artistId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false
       },
       include:{
        images: true,
        color:true,
        category:true,
        size:true,
        artist:true,
       },
       orderBy:{
        createdAt:'desc'
       }
    });

    return NextResponse.json(product);
    } catch(error){
        console.log('PRODUCTS_GET]',error);
        return new NextResponse("internal error",{status:500});
    }
};

