"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  IconBolt,
  IconCode,
  IconMailFilled,
  IconTrain,
} from "@tabler/icons-react";
import ModeToggle from "./mode-toggle";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`sticky left-0 right-0 top-0 z-50 flex flex-row items-center justify-between p-3 backdrop-blur-lg ${
        isScrolled ? "border-b border-b-accent" : ""
      }`}
    >
      <Link href="/">
        <div className="transition-colors inline-flex gap-3 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium text-muted-foreground h-7 px-3 cursor-pointer hover:text-foreground">
          <IconTrain size="20" stroke="1.5" />
          <span className="">Code Viewer</span>
        </div>
      </Link>
      <div className="flex flex-row items-center justify-center gap-5">
        <Button variant="ghost" size="sm" className="flex gap-1" asChild>
          <Link href="/">
            <IconBolt size="20" stroke="1.5" />
            <span className="hidden md:block">New Snippet</span>
          </Link>
        </Button>
        <Button variant="ghost" size="sm" className="flex gap-1" asChild>
          <Link href="/">
            <IconCode size="20" stroke="1.5" />
            <span className="hidden md:block">All Snippets</span>
          </Link>
        </Button>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
