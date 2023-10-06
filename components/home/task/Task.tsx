import { BoardType, TaskType } from "@/util/interfaces";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import TaskOptions from "./TaskOptions";

export default function Task({
  task,
  currentBoard,
}: {
  task: TaskType;
  currentBoard: BoardType;
}) {
  const subTasksComplete = task.subtasks.reduce(
    (acc, complete) => (!complete ? acc + 1 : acc),
    0,
  );

  const renderSubtasks = () => {
    return task.subtasks.map((subtask) => (
      <div
        key={subtask.title}
        className="bg-main-background flex w-full items-center  space-x-3 rounded-lg p-6 transition duration-200 hover:bg-secondary-blue hover:bg-opacity-100"
      >
        <Checkbox id={subtask.title} />
        <label
          htmlFor={subtask.title}
          className="text-md font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {subtask.title}
        </label>
      </div>
    ));
  };

  const renderDropdown = () => {
    if (!currentBoard) return [];

    return (
      <Select>
        <SelectTrigger className="w-full p-6">
          <SelectValue placeholder={task.status ? task.status : "No Status"} />
        </SelectTrigger>
        <SelectContent>
          {currentBoard.columns.map((column) => (
            <SelectItem key={column.name} value={column.name}>
              {column.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-nav-background group mb-6 w-72 cursor-pointer rounded-lg p-4 text-left">
        <h1 className="mb-2 font-bold group-hover:text-primary-blue">
          {task.title}
        </h1>
        <h2>
          {subTasksComplete} of {task.subtasks.length} subtasks
        </h2>
      </DialogTrigger>
      <DialogContent className="bg-nav-background w-96 p-8">
        <DialogHeader>
          <DialogTitle className="dialog-content-header flex items-center justify-between">
            {task.title}
            <TaskOptions task={task} />
          </DialogTitle>
          <h1 className="font-bold text-primary-medium-grey">
            Subtasks ({subTasksComplete} of {task.subtasks.length})
          </h1>
        </DialogHeader>
        {renderSubtasks()}
        <div className="w-full outline-white">{renderDropdown()}</div>
      </DialogContent>
    </Dialog>
  );
}
