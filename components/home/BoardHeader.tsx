"use client";
import MobileIcon from "@/public/assets/logo-mobile.svg";
import DesktopDarkIcon from "@/public/assets/logo-light.svg";
import DesktopLightIcon from "@/public/assets/logo-dark.svg";
import ChevronDwon from "@/public/assets/icon-chevron-down.svg";
import Ellipsis from "@/public/assets/icon-vertical-ellipsis.svg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Dispatch, SetStateAction } from "react";
import { BoardsType, BoardType } from "@/util/interfaces";
import { renderAllBoards } from "@/util/helper";
import ThemeSwitch from "./ThemeSwitch";

export default function BoardHeader({
  boards,
  currentBoard,
  setCurrentBoard,
}: {
  boards: BoardsType;
  currentBoard: BoardType | null;
  setCurrentBoard: Dispatch<SetStateAction<BoardType | null>>;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="bg-nav-background box-border flex max-h-[var(--header-height)] min-h-[var(--header-height)] justify-between p-6">
      {/* Logo and board drop down container */}
      <div className="flex items-center space-x-4 md:space-x-2">
        <MobileIcon className="md:hidden" />
        <div className="hidden md:block md:w-[260px]">
          {theme == "light" ? <DesktopLightIcon /> : <DesktopDarkIcon />}
        </div>
        <div className="flex items-center space-x-2">
          <div className="hidden outline-none md:inline">
            <h1 className="text-2xl font-bold">{currentBoard?.name}</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-4 outline-none md:hidden">
              <h1 className="text-2xl font-bold ">{currentBoard?.name}</h1>
              <ChevronDwon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-16 mt-10 w-[300px] md:hidden">
              <DropdownMenuLabel className="p-4 font-bold tracking-widest text-primary-medium-grey">
                ALL BOARDS ({boards?.boards.length})
              </DropdownMenuLabel>
              {renderAllBoards(boards, setCurrentBoard, true)}
              <DropdownMenuSeparator />
              <div className="p-6">
                <ThemeSwitch customWidth="100%" />
              </div>
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
          <h1 className="md:hidden">+</h1>
          <h1 className="hidden text-sm font-extrabold md:inline">
            + Add New Task
          </h1>
        </Button>
        <Ellipsis />
      </div>
    </nav>
  );
}
