import { TaskType } from "@/util/interfaces";

export default function Task({ task }: { task: TaskType }) {
  return (
    <div className="w-46 bg-nav-background group mb-6 cursor-pointer rounded-lg p-4">
      <h1 className="mb-2 font-bold group-hover:text-primary-blue">
        {task.title}
      </h1>
      <h2>
        {task.subtasks.reduce(
          (acc, complete) => (!complete ? acc + 1 : acc),
          0,
        )}{" "}
        of {task.subtasks.length} subtasks
      </h2>
    </div>
  );
}
