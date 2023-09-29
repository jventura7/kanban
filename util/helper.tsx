import { Dispatch, SetStateAction } from "react";
import { BoardType, BoardsType } from "./interfaces";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const renderAllBoards = (
  boards: BoardsType,
  setCurrentBoard: Dispatch<SetStateAction<BoardType | null>>,
  asMenuItem: boolean,
) => {
  if (!boards) return [];

  return (
    <>
      {boards.boards.map((board) =>
        asMenuItem ? (
          <div className="mb-2 w-full pr-8">
            <DropdownMenuItem
              key={board.name}
              onClick={() => setCurrentBoard(board)}
              className="hover:bg-item-hover cursor-pointer rounded-r-full p-4 text-lg font-bold hover:text-primary-blue"
            >
              {board.name}
            </DropdownMenuItem>
          </div>
        ) : (
          <div className="mb-2 w-full pr-8">
            <Button
              key={board.name}
              onClick={() => setCurrentBoard(board)}
              className="bg-nav-background hover:bg-item-hover flex w-full items-center justify-start rounded-r-full py-7 pl-6 text-xl font-bold text-primary-medium-grey hover:text-primary-blue hover:opacity-100"
            >
              {board.name}
            </Button>
          </div>
        ),
      )}
    </>
  );
};
