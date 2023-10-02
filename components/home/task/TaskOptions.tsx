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
import { TaskType } from "@/util/interfaces";

export default function TaskOptions({ task }: { task: TaskType }) {
  return (
    <DropdownMenu>
      {/* Options (Edit or Delete) */}
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 flex flex-col space-y-4 p-4">
        <Dialog>
          <DialogTrigger>Edit Task</DialogTrigger>
          <DialogContent>
            <DialogTitle>Edit Task Content</DialogTitle>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger className="text-red-500">Delete Task</DialogTrigger>
          <DialogContent className="flex flex-col space-y-4">
            <DialogTitle className="dialog-content-header text-red-500">
              Delete this task?
            </DialogTitle>
            <p>
              Are you sure you want to delete the "{task.title}" task and its
              subtasks? This action cannot be reversed.
            </p>
            <div className="flex w-full space-x-4">
              <Button className="w-full rounded-full bg-red-500 font-bold transition duration-200">
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
