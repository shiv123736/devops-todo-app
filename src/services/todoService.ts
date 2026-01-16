import prisma from "../utils/prisma";
import { Todo } from "../models/todoModel";

export const getAllTodosService = async (): Promise<Todo[]> => {
    return await prisma.todo.findMany({
        orderBy: { id: 'asc' }
    });   
}

export const createTodoService = async (task: string): Promise<Todo> => {
    return await prisma.todo.create({
        data: {
            task:task,
            completed:false
        }
    });
}

export const updateTodoService = async (id: number, completed: boolean): Promise<Todo> => {
    return await prisma.todo.update({
        where: { id },
        data: { completed }
    });
}

export const deleteTodoService = async (id: number): Promise<void> => {
    await prisma.todo.delete({
        where: { id }
    });
    
}
