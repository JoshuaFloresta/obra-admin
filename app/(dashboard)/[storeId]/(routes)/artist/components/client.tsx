"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ArtistColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface ArtistClientProps{
    data:ArtistColumn[]
}

export const ArtistClient:React.FC<ArtistClientProps> = ({
    data
}) => {
 
    const router =useRouter();
    const params = useParams();

    return(
        <>
        <div className="flex item-center justify-between">
           <Heading
           title={`Artist (${data.length})`}
           description="Manage Artist for store"
           />

           <Button onClick={() =>router.push(`/${params.storeId}/artist/new`)}>
                <Plus className="mr-2 w-4 h-4"/>
                Add New
           </Button>
        </div>
        <Separator/>
        <DataTable  searchKey="name" columns={columns} data = {data} />
        <Heading title="API" description="API calls for colors"/>
        <Separator/>
        <ApiList entityName="artist" entityIdName="artistId"/>
        </>
    )
}