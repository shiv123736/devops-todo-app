import { Router } from "express";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../controller/todoController";

const router = Router();

router.get("/todos", getTodos);         // Matches GET /api/todos
router.post("/todos", createTodo);      // Matches POST /api/todos
router.put("/todos/:id", updateTodo);   // Matches PUT /api/todos/:id
router.delete("/todos/:id", deleteTodo); // Matches DELETE /api/todos/:id

export default router;