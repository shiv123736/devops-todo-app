import {z} from "zod";

// Define what a "Create Todo" request must look like
export const createTodoSchema = z.object({
  task: z.string().min(3, "Title must be at least 3 characters long" ),
  completed: z.boolean().optional().default(false),
});

// Define what an "Update Todo" request must look like
export const updateTodoSchema = z.object({
  task: z.string().min(3).optional(),
  completed: z.boolean().optional(),
});