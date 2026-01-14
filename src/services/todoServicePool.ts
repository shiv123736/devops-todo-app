import pool from "../config/db";
import { Todo } from "../models/todoModel";

export const getAllTodosService = async (): Promise<Todo[]> => {
    const res = await pool.query<Todo>("SELECT * FROM todos ORDER BY id ASC");
    return res.rows;
}

export const createTodoService = async (task: string): Promise<Todo> => {
    const res = await pool.query<Todo>(
        "INSERT INTO todos (task, completed) VALUES ($1, $2) RETURNING *",   
        [task, false]
    );
    return res.rows[0];
}

export const updateTodoService = async (id: number, completed: boolean): Promise<Todo> => {
    const res = await pool.query<Todo>(
        "UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *",    
        [completed, id]
    );
    if(res.rows.length === 0) {
        // return null if no todo found with the given id
        throw new Error("Todo not found");
    }
    return res.rows[0];
}

export const deleteTodoService = async (id: number): Promise<void> => {
    await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    
}
