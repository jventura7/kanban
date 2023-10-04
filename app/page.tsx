"use client";
import BoardHeader from "@/components/home/board/BoardHeader";
import SideBar from "@/components/home/SideBar";
import BoardData from "@/data.json";
import { useState } from "react";
import Board from "@/components/home/board/Board";

export default function Home() {
  const [taskBoard, setTaskBoard] = useState(BoardData);
  const [currentBoard, setCurrentBoard] = useState(
    BoardData.boards.length > 0 ? BoardData.boards[0] : null,
  );
  console.log(taskBoard);
  return (
    <main className="bg-main-background min-h-screen">
      <BoardHeader
        boards={taskBoard}
        currentBoard={currentBoard}
        setCurrentBoard={setCurrentBoard}
      />
      <div className="min-h-[var(--main-height)] md:grid md:grid-cols-[260px_minmax(900px,_1fr)]">
        {/* Sidebar */}
        <SideBar
          boards={taskBoard}
          currentBoard={currentBoard}
          setCurrentBoard={setCurrentBoard}
        />
        <Board currentBoard={currentBoard} />
      </div>
    </main>
  );
}
