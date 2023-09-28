"use client";
import MobileIcon from "@/public/assets/logo-mobile.svg";
import ChevronDwon from "@/public/assets/icon-chevron-down.svg";
import Ellipsis from "@/public/assets/icon-vertical-ellipsis.svg";
import LightIcon from "@/public/assets/icon-light-theme.svg";
import DarkIcon from "@/public/assets/icon-dark-theme.svg";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

export default function BoardNav() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="bg-nav-background flex justify-between p-6">
      {/* Logo and board drop down container */}
      <div className="flex items-center space-x-4">
        <MobileIcon />
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-4 outline-none">
              <h1 className="text-2xl font-bold ">Platform Launch</h1>
              <ChevronDwon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-8 w-64">
              <DropdownMenuLabel className="p-4 tracking-widest text-primary-medium-grey">
                ALL BOARDS
              </DropdownMenuLabel>
              <div className="bg-main-background m-auto flex w-56 items-center justify-center space-x-4 rounded-lg p-2 py-3">
                <LightIcon />
                <Switch
                  checked={theme == "light" ? false : true}
                  onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
                  className="bg-primary-blue"
                />
                <DarkIcon />
              </div>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Button container */}
      <div className="flex items-center space-x-4">
        <Button
          size={"lg"}
          className="rounded-full text-xl font-bold transition duration-200"
        >
          +
        </Button>
        <Ellipsis />
      </div>
    </nav>
  );
}
