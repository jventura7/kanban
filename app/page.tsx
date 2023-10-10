"use client";
import BoardHeader from "@/components/home/board/BoardHeader";
import SideBar from "@/components/home/SideBar";
import BoardData from "@/data.json";
import { useEffect, useState } from "react";
import Board from "@/components/home/board/Board";
import { useStore } from "@/util/store";

export default function Home() {
  const { setBoards, boards, currentBoard } = useStore();

  useEffect(() => {
    setBoards(BoardData);
  }, []);

  return (
    <main className="bg-main-background min-h-screen">
      <BoardHeader boards={boards} currentBoard={currentBoard} />
      <div className="min-h-[var(--main-height)] md:grid md:grid-cols-[260px_minmax(200px,1fr)]">
        {/* Sidebar */}
        <SideBar boards={boards} currentBoard={currentBoard} />
        <Board currentBoard={currentBoard} />
      </div>
    </main>
  );
}
