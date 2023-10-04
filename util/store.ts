import { create } from "zustand";
import { BoardType, BoardsType } from "./interfaces";

const addBoard = (
  boards: BoardsType | null,
  newBoard: BoardType | null,
): BoardsType | null => {
  if (!newBoard) return boards;
  if (!boards) return null;

  const newBoards = { ...boards };
  newBoards.boards.push(newBoard);
  return newBoards;
};

const deleteBoard = (
  boards: BoardsType | null,
  boardToDelete: BoardType | null,
): BoardsType | null => {
  if (!boardToDelete) return boards;
  if (!boards) return null;

  const newBoards = { ...boards };
  newBoards.boards.filter((boards) => boards.name != boardToDelete.name);
  return newBoards;
};

type Store = {
  boards: BoardsType | null;
  newBoard: BoardType | null;
  boardToDelete: BoardType | null;
  addBoard: () => void;
  deleteBoard: () => void;
  setBoardToDelete: (board: BoardType) => void;
};

const useStore = create<Store>((set) => ({
  boards: null,
  newBoard: null,
  boardToDelete: null,
  addBoard: () =>
    set((state) => ({
      ...state,
      boards: addBoard(state.boards, state.newBoard),
    })),
  deleteBoard: () =>
    set((state) => ({
      ...state,
      boards: deleteBoard(state.boards, state.boardToDelete),
    })),
  setBoardToDelete: (board: BoardType) =>
    set((state) => ({
      ...state,
      boardToDelete: board,
    })),
}));
