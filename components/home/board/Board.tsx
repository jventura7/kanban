import { BoardType } from "@/util/interfaces";
import Task from "../task/Task";
import { Button } from "../../ui/button";
import EditBoard from "./EditBoard";
import { useStore } from "@/util/store";

export default function Board() {
  const { currentBoard } = useStore();

  const getColumnsForBoard = () => {
    if (!currentBoard?.columns) return [];

    const columns = currentBoard.columns.map((column) => (
      <div
        key={column.name + "current_board"}
        className="min-w-[300px] max-w-[300px]"
      >
        <h1 className="mb-8 text-sm font-bold tracking-wider text-primary-medium-grey">
          {`${column.name} (${column.tasks ? column.tasks.length : 0})`}
        </h1>
        {column.tasks?.map((task) => <Task key={task.title} task={task} />)}
      </div>
    ));

    columns.push(<EditBoard />);
    return columns;
  };

  const columns = getColumnsForBoard();
  return (
    <>
      {currentBoard?.columns.length === 0 ? (
        <div className="mx-20 mt-60 text-center">
          <h1 className="mb-6 text-2xl font-bold">
            This board is empty. Create a new column to get started.
          </h1>
          <Button className="rounded-full bg-primary-blue p-8 text-lg font-bold text-white transition duration-200 hover:opacity-80">
            + Add New Column
          </Button>
        </div>
      ) : (
        <div className="no-scrollbar flex max-h-[var(--main-height)] w-full space-x-8 overflow-scroll overflow-y-auto p-10">
          {columns}
        </div>
      )}
    </>
  );
}
