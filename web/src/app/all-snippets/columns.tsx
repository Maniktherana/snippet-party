"use client";

import { Button } from "@/components/ui/button";
import { langauges } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Snippet = {
  id: number;
  username: string;
  language: langauges;
  code: string;
  stdin: string;
  stdout: string;
  createdAt: Date;
};

export const columns: ColumnDef<Snippet>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = new Date(row.original.createdAt);
      const formattedDate = createdAt.toLocaleDateString("en-GB");
      return <p>{formattedDate}</p>;
    },
  },

  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "language",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Language
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => {
      const code = atob(row.original.code);
      return (
        <code className="font-mono font-extralight whitespace-pre-wrap	">
          {code}
        </code>
      );
    },
  },
  {
    accessorKey: "stdin",
    header: "Stdin",
    cell: ({ row }) => {
      const stdin = atob(row.original.stdin);
      return (
        <code className="font-mono font-extralight whitespace-pre-wrap	">
          {stdin}
        </code>
      );
    },
  },
  {
    accessorKey: "stdout",
    header: "Stdout",
    cell: ({ row }) => {
      const stdout = atob(row.original.stdout);
      return (
        <code className="font-mono font-extralight whitespace-pre-wrap	">
          {stdout}
        </code>
      );
    },
  },
];
