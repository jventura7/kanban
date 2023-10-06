import { BoardsType } from "./interfaces";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useStore } from "./store";
import CreateBoard from "@/components/home/board/CreateBoard";

export const renderAllBoards = (
  boards: BoardsType | null,
  asMenuItem: boolean,
  uniqueKey: string,
) => {
  if (!boards) return [];
  const store = useStore();

  const renderBoards = () => {
    const boardRenders = boards.boards.map((board) =>
      asMenuItem ? (
        <div key={board.name + uniqueKey} className="mb-2 w-full pr-8">
          <DropdownMenuItem
            key={board.name + uniqueKey + "-button"}
            onClick={() => store.setCurrentBoard(board)}
            className="hover:bg-item-hover cursor-pointer rounded-r-full p-4 text-lg font-bold hover:text-primary-blue"
          >
            {board.name}
          </DropdownMenuItem>
        </div>
      ) : (
        <div key={board.name + uniqueKey} className="mb-2 w-full pr-8">
          <Button
            key={board.name + uniqueKey + "-button"}
            onClick={() => store.setCurrentBoard(board)}
            className="bg-nav-background hover:bg-item-hover flex w-full items-center justify-start rounded-r-full py-7 pl-6 text-lg font-bold text-primary-medium-grey hover:text-primary-blue hover:opacity-100"
          >
            {board.name}
          </Button>
        </div>
      ),
    );

    boardRenders.push(<CreateBoard asMenuItem={asMenuItem} />);

    return boardRenders;
  };

  return <>{renderBoards()}</>;
};
