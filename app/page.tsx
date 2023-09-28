"use client";
import BoardNav from "@/components/home/BoardNav";
import Task from "@/components/home/Task";
import { Button } from "@/components/ui/button";
import BoardData from "@/data.json";
import { useState } from "react";

export default function Home() {
  const [taskBoard, setTaskBoard] = useState(BoardData);
  const [currentBoard, setCurrentBoard] = useState(
    BoardData.boards.length > 0 ? BoardData.boards[0] : null,
  );

  const getColumnsForBoard = () => {
    if (!currentBoard?.columns) return [];

    return currentBoard.columns.map((column) => (
      <div key={column.name} className="min-w-[300px] max-w-[300px]">
        <h1 className="mb-8 text-sm font-bold tracking-wider text-primary-medium-grey">
          {`${column.name} (${column.tasks.length})`}
        </h1>
        {column.tasks.map((task) => (
          <Task task={task} />
        ))}
      </div>
    ));
  };

  const columns = getColumnsForBoard();

  return (
    <main className="bg-main-background min-h-screen">
      <BoardNav
        boards={taskBoard}
        currentBoard={currentBoard}
        setCurrentBoard={setCurrentBoard}
      />
      {currentBoard?.columns.length == 0 ? (
        <div className="mx-20 mt-60 text-center">
          <h1 className="mb-6 text-xl font-bold">
            This board is empty. Create a new column to get started
          </h1>
          <Button className="transition duration-200">+ Add New Column</Button>
        </div>
      ) : (
        <div className="no-scrollbar flex w-full space-x-8 overflow-scroll p-10">
          {columns}
        </div>
      )}
    </main>
  );
}
