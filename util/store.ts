import { create } from "zustand";
import { BoardType, BoardsType } from "./interfaces";

const addBoard = (
  boards: BoardsType | null,
  boardToAdd: BoardType | null,
): BoardsType | null => {
  if (!boardToAdd || !boards) return boards;

  const newBoards = { ...boards };
  newBoards.boards.push(boardToAdd);
  return newBoards;
};

const deleteBoard = (
  boards: BoardsType | null,
  boardToDelete: BoardType | null,
): { success: boolean; updatedBoards: BoardsType | null } => {
  if (!boardToDelete || !boards) {
    return { success: false, updatedBoards: boards };
  }

  const filteredBoards = boards.boards.filter(
    (board) => board.name !== boardToDelete.name,
  );

  return {
    success: filteredBoards.length !== boards.boards.length,
    updatedBoards: { ...boards, boards: filteredBoards },
  };
};

type Store = {
  boards: BoardsType | null;
  currentBoard: BoardType | null;
  addBoard: (boardToAdd: BoardType | null) => void;
  deleteBoard: (boardToDelete: BoardType | null) => void;
  setCurrentBoard: (board: BoardType | null) => void;
  setBoards: (boards: BoardsType | null) => void;
};

export const useStore = create<Store>((set) => ({
  boards: null,
  currentBoard: null,
  addBoard: (boardToAdd: BoardType | null) =>
    set((state) => ({
      ...state,
      boards: addBoard(state.boards, boardToAdd),
    })),
  deleteBoard: (boardToDelete: BoardType | null) =>
    set((state) => {
      const { success, updatedBoards } = deleteBoard(
        state.boards,
        boardToDelete,
      );
      return {
        ...state,
        boards: updatedBoards,
        currentBoard: success ? updatedBoards?.boards[0] : state.currentBoard,
      };
    }),
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
