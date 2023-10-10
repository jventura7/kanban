import { z } from "zod";

const subtaskSchema = z.object({
  title: z.string(),
  isCompleted: z.boolean(),
});

const taskSchema = z.object({
  title: z.string(),
  description: z.string(),
  subtasks: z.array(subtaskSchema),
  status: z.string(),
});

const columnSchema = z.object({
  name: z.string().min(1, {
    message: "Column name cannot be empty",
  }),
  tasks: z.array(taskSchema).optional(),
});

const boardSchema = z.object({
  name: z.string().min(1, {
    message: "Board name cannot be empty",
  }),
  columns: z.array(columnSchema).optional(),
});

export { subtaskSchema, taskSchema, columnSchema, boardSchema };
