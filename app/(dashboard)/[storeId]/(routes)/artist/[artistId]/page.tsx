import prismadb from "@/lib/prismadb";
import { ArtistForm } from "./components/artist-form";

const ArtistPage =async ({
    params
}:{
    params:{artistId:string}
}) => {
    const artist = await prismadb.artist.findUnique({
        where:{
            id:params.artistId
        }
    })
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ArtistForm initialData={artist}/>
            </div>
        </div>
     );
}
 
export default ArtistPage;