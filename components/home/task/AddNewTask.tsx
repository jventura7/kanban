import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BoardType } from "@/util/interfaces";

export default function AddNewTask({
  currentBoard,
}: {
  currentBoard: BoardType;
}) {
  return (
    <Dialog>
      <DialogTrigger className="rounded-full bg-primary-blue p-4 py-3 font-bold text-white ">
        + Add New Task
      </DialogTrigger>
      <DialogContent className="w-96 p-8">
        <DialogTitle className="dialog-content-header ">
          Add New Task
        </DialogTitle>
        <div className="flex flex-col space-y-12">
          <div>
            <Label htmlFor="task-name">Task Name</Label>
            <Input
              className="mt-3"
              id="task-name"
              placeholder="e.g. Take coffee break"
            />
          </div>
          <div>
            <Label className="mb-8" htmlFor="task-name">
              Description
            </Label>
            <Textarea
              className="mt-3"
              id="task-name"
              placeholder="e.g. It's always a good to take a break. This 15 minute break will recharge the batteries a little."
            />
          </div>
          <div className="flex flex-col">
            <Label className="mb-3">Subtasks</Label>
            <Button className="rounded-full bg-[var(--item-hover)] font-bold text-primary-blue transition duration-200">
              + Add New Subtask
            </Button>
          </div>
          <Label>Current Status</Label>
        </div>
      </DialogContent>
    </Dialog>
  );
}
