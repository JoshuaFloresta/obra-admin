import prismadb from "@/lib/prismadb";
import { ArtistClient } from "./components/client";
import {  ArtistColumn } from "./components/columns";

import { format } from "date-fns";



const ArtistPage = async ({
    params
}: {
    params: { storeId:string  }
}) => {

    const artist = await prismadb.artist.findMany({
        where: {
            storeId:params.storeId
        },
        orderBy:{
            createdAt:'desc'
        }
    });

    const formattedArtist:ArtistColumn[] = artist.map((item) =>({
        id:item.id,
        name:item.name,
        createdAt: format(item.createdAt,"MMM do, yyyy h:mm aa")
    }))

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 px-8 p-6 pb-8">
                <ArtistClient data={formattedArtist}/>
            </div>
        </div>
     );
}
 
export default ArtistPage;

