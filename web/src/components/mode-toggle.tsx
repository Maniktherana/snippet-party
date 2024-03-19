import React from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { IconMoon, IconSunHigh } from "@tabler/icons-react";

const ModeToggle = () => {
  const { setTheme } = useTheme();

  const toggleTheme = () => {
    const currentTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };
  return (
    <Button onClick={toggleTheme} variant="ghost" size="sm">
      <IconSunHigh
        stroke="1.5"
        size="20"
        className="rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0"
      />
      <IconMoon
        stroke="1.5"
        size="20"
        className="absolute rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ModeToggle;
