"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { AlignRight, ExternalLink, Home, Mic2 } from "lucide-react";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { IconBolt, IconCode } from "@tabler/icons-react";

const Menu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex items-center gap-2 border-2 border-none"
          variant="ghost"
          size="sm"
        >
          <AlignRight size="20px" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[16rem] font-sans rounded-[0.75rem] bg-card text-foreground"
      >
        <DropdownMenuItem asChild className="h-11 rounded-lg text-md gap-3">
          <Link href="/">
            <IconBolt size="20" stroke="1.5" />
            <span>New Snippet</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="h-11 rounded-lg text-md gap-3">
          <Link href="/all-snippets">
            <IconCode size="20" stroke="1.5" />
            <span>All Snippets</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
