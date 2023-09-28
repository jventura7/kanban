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
import { BoardsType, BoardType } from "@/util/interfaces";
import { Dispatch, SetStateAction } from "react";

export default function BoardNav({
  boards,
  currentBoard,
  setCurrentBoard,
}: {
  boards: BoardsType;
  currentBoard: BoardType | null;
  setCurrentBoard: Dispatch<SetStateAction<BoardType | null>>;
}) {
  const { theme, setTheme } = useTheme();

  const handleChangeBoard = (newBoard: BoardType) => {
    setCurrentBoard(newBoard);
  };

  const getAllBoards = () => {
    if (!currentBoard) return [];

    return boards.boards.map((board) => {
      return (
        <DropdownMenuItem
          onClick={() => handleChangeBoard(board)}
          className="cursor-pointer p-4 text-lg font-bold"
        >
          {board.name}
        </DropdownMenuItem>
      );
    });
  };

  return (
    <nav className="bg-nav-background flex justify-between p-6">
      {/* Logo and board drop down container */}
      <div className="flex items-center space-x-4">
        <MobileIcon />
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-4 outline-none">
              <h1 className="text-2xl font-bold ">{currentBoard?.name}</h1>
              <ChevronDwon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-92 ml-16 mt-10">
              <DropdownMenuLabel className="p-4 tracking-widest text-primary-medium-grey">
                ALL BOARDS
              </DropdownMenuLabel>
              {getAllBoards()}
              <div className="bg-main-background m-auto flex w-80 items-center justify-center space-x-4 rounded-lg p-2 py-3">
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
