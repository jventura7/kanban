import { create } from "zustand";
import { BoardType, BoardsType } from "./interfaces";

const addBoard = (
  boards: BoardsType | null,
  newBoard: BoardType | null,
): BoardsType | null => {
  if (!newBoard || !boards) return boards;

  const newBoards = { ...boards };
  newBoards.boards.push(newBoard);
  return newBoards;
};

const deleteBoard = (
  boards: BoardsType | null,
  boardToDelete: BoardType | null,
): BoardsType | null => {
  if (!boardToDelete || !boards) return boards;

  const newBoards = {
    ...boards,
    boards: boards.boards.filter((board) => board.name != boardToDelete.name),
  };

  return newBoards;
};

type Store = {
  boards: BoardsType | null;
  currentBoard: BoardType | null;
  newBoard: BoardType | null;
  addBoard: () => void;
  deleteBoard: (boardToDelete: BoardType | null) => void;
  setCurrentBoard: (board: BoardType | null) => void;
  setBoards: (boards: BoardsType | null) => void;
};

export const useStore = create<Store>((set) => ({
  boards: null,
  newBoard: null,
  currentBoard: null,
  addBoard: () =>
    set((state) => ({
      ...state,
      boards: addBoard(state.boards, state.newBoard),
    })),
  deleteBoard: (boardToDelete: BoardType | null) =>
    set((state) => ({
      ...state,
      boards: deleteBoard(state.boards, boardToDelete),
      currentBoard: state.boards?.boards[0],
    })),
  setCurrentBoard: (board: BoardType | null) =>
    set((state) => ({
      ...state,
      currentBoard: board,
    })),
  setBoards: (boards: BoardsType | null) =>
    set((state) => ({
      ...state,
      boards: boards,
      currentBoard: boards?.boards[0],
    })),
}));
