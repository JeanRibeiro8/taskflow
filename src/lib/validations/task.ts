
import { z } from "zod";

// ZOD: Validates data used to create a task.
export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Task title is required.")
    .max(100, "Task title must have at most 100 characters."),
});

// ZOD: Validates data used to update a task status.
export const updateTaskSchema = z.object({
  id: z.number().int().positive(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
});
