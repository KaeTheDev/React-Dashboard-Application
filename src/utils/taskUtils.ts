import type { TaskFormData } from "../types";

// Adds a task to localStorage
export const saveTaskToLocalStorage = (task: TaskFormData) => {
    // 1. Get current tasks
    const tasksJSON = localStorage.getItem("tasks");
    // Read the current tasks from localStorage (or use [] if none)
    // Parse them into an array
    const tasks: TaskFormData[] = tasksJSON ? JSON.parse(tasksJSON) : [];

    // 2. Add new task
    const updatedTasks = [...tasks, task];

    // 3. Save back to localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // return the updated array
    return updatedTasks;
}

export const loadTasksFromLocalStorage = () => {
    // Get items from storage
    const tasksJSON = localStorage.getItem("tasks");
    // return the items or an empty array
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}