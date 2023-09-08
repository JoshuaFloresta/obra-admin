"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CellAction } from "./cell-action";

export type ArtistColumn = {
  id: string;
  name: string;
 createdAt: string;
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
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
