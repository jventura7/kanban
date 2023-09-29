import { Dispatch, SetStateAction } from "react";
import { BoardType, BoardsType } from "./interfaces";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

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
          <DropdownMenuItem
            key={board.name}
            onClick={() => setCurrentBoard(board)}
            className="cursor-pointer p-4 text-lg font-bold"
          >
            {board.name}
          </DropdownMenuItem>
        ) : (
          <div
            key={board.name}
            onClick={() => setCurrentBoard(board)}
            className="cursor-pointer p-4 text-lg font-bold"
          >
            {board.name}
          </div>
        ),
      )}
    </>
  );
};
