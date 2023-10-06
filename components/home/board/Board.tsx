import { BoardType } from "@/util/interfaces";
import Task from "../task/Task";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

export default function Board({
  currentBoard,
}: {
  currentBoard: BoardType | null;
}) {
  const getColumnsForBoard = () => {
    if (!currentBoard?.columns) return [];

    const columns = currentBoard.columns.map((column) => (
      <div
        key={column.name + "current_board"}
        className="min-w-[300px] max-w-[300px]"
      >
        <h1 className="mb-8 text-sm font-bold tracking-wider text-primary-medium-grey">
          {`${column.name} (${column.tasks.length})`}
        </h1>
        {column.tasks.map((task) => (
          <Task key={task.title} task={task} currentBoard={currentBoard} />
        ))}
      </div>
    ));

    columns.push(
      <Dialog>
        <DialogTrigger className="bg-nav-background mt-[52px] min-w-[300px] max-w-[300px] rounded-xl p-10 text-2xl font-bold opacity-40 transition duration-300 hover:text-primary-blue hover:opacity-100">
          + New Column
        </DialogTrigger>
        <DialogContent className="bg-nav-background">
          <DialogHeader>
            <DialogTitle className="dialog-content-header">
              Edit Board
            </DialogTitle>
          </DialogHeader>
          <Label htmlFor="board-name">Board Name</Label>
          <Input
            id="board-name"
            className="bg-nav-background border-primary-medium-grey"
          />
          <div className="mt-4 flex flex-col space-y-4">
            <Label htmlFor="board-columns">Board Columns</Label>
            <Button className="rounded-full bg-[var(--secondary-medium-grey)] font-bold text-primary-blue transition duration-200">
              + Add New Column
            </Button>
          </div>
          <Button className="rounded-full font-bold transition duration-200">
            Save Changes
          </Button>
        </DialogContent>
      </Dialog>,
    );
    return columns;
  };

  const columns = getColumnsForBoard();
  console.log(currentBoard);
  return (
    <>
      {!currentBoard ? (
        <div className="mx-20 mt-60 text-center">
          <h1 className="mb-6 text-xl font-bold">
            This board is empty. Create a new column to get started
          </h1>
          <Button className="transition duration-200">+ Add New Column</Button>
        </div>
      ) : (
        <div className="no-scrollbar flex max-h-[var(--main-height)] w-full space-x-8 overflow-scroll overflow-y-auto p-10">
          {columns}
        </div>
      )}
    </>
  );
}
