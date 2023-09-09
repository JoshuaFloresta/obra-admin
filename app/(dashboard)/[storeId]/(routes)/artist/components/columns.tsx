"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CellAction } from "./cell-action";

export type ArtistColumn = {
  id: string;
  name: string;
 createdAt: string;
 imageUrl:string;
};

export const columns: ColumnDef<ArtistColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  
  {
    accessorKey: "createdAt",
    header: "Date",
  },

    {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <img src={row.original.imageUrl} alt={row.original.name} style={{ width: "40px", height: "40px" }} className="rounded-full"/>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
