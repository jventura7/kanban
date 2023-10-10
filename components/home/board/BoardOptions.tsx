"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Ellipsis from "@/public/assets/icon-vertical-ellipsis.svg";
import { useStore } from "@/util/store";
import { useState } from "react";
import EditBoard from "./EditBoard";

export default function BoardOptions() {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { deleteBoard, currentBoard } = useStore();

  const handleDeleteBoard = () => {
    deleteBoard(currentBoard);
    setOpenDelete(false);
  };

  return (
    <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
      {/* Options (Edit or Delete) */}
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-nav-background mr-4 mt-8 flex flex-col space-y-4 p-4">
        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <DialogTrigger>Edit board</DialogTrigger>
          <EditBoard setOpenEdit={setOpenEdit} />
        </Dialog>
        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
          <DialogTrigger className="text-red-500">Delete board</DialogTrigger>
          <DialogContent className="bg-nav-background flex flex-col space-y-4">
            <DialogTitle className="dialog-content-header text-red-500">
              Delete this board?
            </DialogTitle>
            <p>
              Are you sure you want to delete the "{currentBoard?.name}" board
              and its subtasks? This action cannot be reversed.
            </p>
            <div className="flex w-full space-x-4">
              <Button
                onClick={handleDeleteBoard}
                className="w-full rounded-full bg-red-500 font-bold transition duration-200"
              >
                Delete
              </Button>
              <Button className="w-full rounded-full bg-[var(--item-hover)] font-bold text-primary-blue transition duration-200">
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
