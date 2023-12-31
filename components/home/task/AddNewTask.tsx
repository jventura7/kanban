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
import { useStore } from "@/util/store";

export default function AddNewTask() {
  const { currentBoard } = useStore();

  return (
    <Dialog>
      <DialogTrigger className="rounded-full bg-primary-blue p-4 py-3 font-bold text-white transition duration-200 hover:opacity-80 md:mr-4">
        + Add New Task
      </DialogTrigger>
      <DialogContent className="bg-nav-background w-96 p-8">
        <DialogTitle className="dialog-content-header">
          Add New Task
        </DialogTitle>
        <div className="dialog-vertical-spacing flex flex-col">
          <div>
            <Label htmlFor="task-name">Task Name</Label>
            <Input
              className="bg-nav-background mt-3 border-primary-medium-grey"
              id="task-name"
              placeholder="e.g. Take coffee break"
            />
          </div>
          <div>
            <Label className="mb-8" htmlFor="task-name">
              Description
            </Label>
            <Textarea
              className="bg-nav-background mt-3 border-primary-medium-grey"
              id="task-name"
              placeholder="e.g. It's always a good to take a break. This 15 minute break will recharge the batteries a little."
            />
          </div>
          <div className="flex flex-col">
            <Label className="mb-3">Subtasks</Label>
            <Button className="rounded-full bg-[var(--item-hover)] p-6 font-bold text-primary-blue transition duration-200">
              + Add New Subtask
            </Button>
          </div>
          <Label>Current Status</Label>
        </div>
      </DialogContent>
    </Dialog>
  );
}
