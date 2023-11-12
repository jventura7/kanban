"use client";
import MobileIcon from "@/public/assets/logo-mobile.svg";
import DesktopDarkIcon from "@/public/assets/logo-light.svg";
import DesktopLightIcon from "@/public/assets/logo-dark.svg";
import ChevronDwon from "@/public/assets/icon-chevron-down.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { renderAllBoards } from "@/util/helper";
import ThemeSwitch from "../ThemeSwitch";
import AddNewTask from "../task/AddNewTask";
import BoardOptions from "./BoardOptions";
import { useStore } from "@/util/store";

export default function BoardHeader() {
  const { theme } = useTheme();
  const { boards, currentBoard } = useStore();

  return (
    <nav className="box-border flex max-h-[var(--header-height)] min-h-[var(--header-height)] justify-between bg-nav-background p-6">
      {/* Logo and board drop down container */}
      <div className="flex items-center space-x-4 md:space-x-2">
        <MobileIcon className="md:hidden" />
        <div className="hidden md:block md:w-[260px]">
          {theme === "light" ? <DesktopLightIcon /> : <DesktopDarkIcon />}
        </div>
        <div className="flex items-center space-x-2">
          <div className="hidden outline-none md:inline">
            <h1 className="text-2xl font-bold">{currentBoard?.name}</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-4 outline-none md:hidden">
              <h1 className="text-2xl font-bold">{currentBoard?.name}</h1>
              <ChevronDwon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-16 mt-10 w-[400px] bg-nav-background md:hidden">
              <DropdownMenuLabel className="p-4 font-bold tracking-widest text-primary-medium-grey">
                ALL BOARDS ({boards?.boards?.length})
              </DropdownMenuLabel>
              {renderAllBoards(true, "-header")}
              <DropdownMenuSeparator />
              <div className="p-2">
                <ThemeSwitch customWidth="100%" />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Button container */}
      <div className="flex items-center space-x-4">
        <AddNewTask />
        <BoardOptions />
      </div>
    </nav>
  );
}
