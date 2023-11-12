import { create } from "zustand";
import { BoardType, BoardsType } from "./interfaces";
import { UserType } from "./interfaces";

const getBoards = async (): Promise<BoardsType | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const addBoardAndUpdate = async (
  boardToAdd: BoardType | null,
): Promise<BoardsType | null> => {
  try {
    if (!boardToAdd) return null;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: boardToAdd.name,
        columns: boardToAdd.columns,
      }),
    });

    const data = await getBoards();
    if (!data) return null;
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
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

const updateBoard = (
  boards: BoardsType | null,
  boardToUpdate: BoardType | null,
  oldName: string | undefined,
): BoardsType | null => {
  if (!boardToUpdate || !boards) return boards;

  const newBoards = {
    ...boards,
    boards: boards.boards.map((board) =>
      board.name === oldName ? boardToUpdate : board,
    ),
  };

  return newBoards;
};

type Store = {
  user: UserType | null;
  boards: BoardsType | null;
  currentBoard: BoardType | null;
  getBoards: () => void;
  addBoard: (boardToAdd: BoardType | null) => void;
  deleteBoard: (boardToDelete: BoardType | null) => void;
  setCurrentBoard: (board: BoardType | null) => void;
  updateCurrentBoard: (
    board: BoardType | null,
    oldName: string | undefined,
  ) => void;
  setBoards: (boards: BoardsType | null) => void;
  setUser: (user: UserType | null) => void;
};

export const useStore = create<Store>((set) => ({
  user: null,
  boards: null,
  currentBoard: null,
  getBoards: async () => {
    const boards = await getBoards();
    set((state) => ({
      ...state,
      boards: boards,
    }));
  },
  addBoard: async (boardToAdd: BoardType | null) => {
    const updatedBoards = await addBoardAndUpdate(boardToAdd);
    set((state) => ({
      ...state,
      boards: updatedBoards,
    }));
  },
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
  updateCurrentBoard: (board: BoardType | null, oldName: string | undefined) =>
    set((state) => ({
      ...state,
      boards: updateBoard(state.boards, board, oldName),
    })),
  setBoards: (boards: BoardsType | null) =>
    set((state) => ({
      ...state,
      boards: boards,
      currentBoard: boards?.boards[0],
    })),
  setUser: (user: UserType | null) =>
    set((state) => ({
      ...state,
      user: user,
    })),
}));
