import { Request, Response, NextFunction } from "express";
import { createTodoService, deleteTodoService, getAllTodosService, updateTodoService } from "../services/todoService";
import { createTodoSchema, updateTodoSchema } from "../schema/todo.schema";

export const getTodos = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const todos = await getAllTodosService();
        res.json(todos);
    }  catch (error) {
        next(error); // This sends it straight to your new middleware!
    }
};

export const createTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // validate request body
    const validation = createTodoSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({ error: validation.error.issues });
        return;
    }

    try {
        // const { task } = req.body;
        const newTodo = await createTodoService(validation.data.task);
        res.status(201).json(newTodo);
    } catch (error) {
        next(error); // This sends it straight to your new middleware!
    }
};

export const updateTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // validate request body
    const validation = updateTodoSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({ error: validation.error.issues });
        return;
    }

    try {
        const id = parseInt(req.params.id as string);
        // const { completed } = req.body;
        const updatedTodo = await updateTodoService(id, validation.data.completed ?? false);
        res.json(updatedTodo);
    } catch (error) {
        next(error); // This sends it straight to your new middleware!
    }
};

export const deleteTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string);
        await deleteTodoService(id);
        res.status(204).send();
    } catch (error) {
        next(error); // This sends it straight to your new middleware!
    }
};

