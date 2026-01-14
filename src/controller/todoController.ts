import { Request, Response } from "express";
import { createTodoService, deleteTodoService, getAllTodosService, updateTodoService } from "../services/todoService";

export const getTodos = async (_req: Request, res: Response): Promise<void> => {
    try {
        const todos = await getAllTodosService();
        res.json(todos);
    } catch (error) {
        console.log("Error creating todo:", error);
        res.status(500).json({ error: "Get: Internal DB server error" });
    }
};

export const createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { task } = req.body;
        const newTodo = await createTodoService(task);
        res.status(201).json(newTodo);
    } catch (error) {
        console.log("Error creating todo:", error);
        res.status(500).json({ error: "Create: Internal DB server error" });
    }
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string);
        const { completed } = req.body;
        const updatedTodo = await updateTodoService(id, completed);
        res.json(updatedTodo);
    } catch (_error) {
        console.log("Error creating todo:", _error);
        res.status(500).json({ _error: "Update: Internal DB server error" });
    }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string);
        await deleteTodoService(id);
        res.status(204).send();
    } catch (error) {
        console.log("Error creating todo:", error);
        res.status(500).json({ error: "Delete: Internal DB server error" });
    }
};