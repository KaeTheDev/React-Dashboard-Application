import type { Task } from "../types";

// Save ALL tasks
export const saveTasksToLocalStorage = (tasks: Task[]) => {
    // Convert the array of tasks into JSON and store it in localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Save ONE new task into localStorage
export const saveTaskToLocalStorage = (task: Task) => {
    // Get the existing tasks from localStorage (stored as a string)
    const tasksJSON = localStorage.getItem("tasks");
   // Convert the JSON string back into an array of tasks OR use an empty array
    const tasks: Task[] = tasksJSON ? JSON.parse(tasksJSON) : [];

    // Create a new updated array containing old tasks + the new one
    const updatedTasks = [...tasks, task];

    // Save the updated array back into localStorage as a JSON string
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

     // Return the updated array so React can update state if needed
    return updatedTasks;
}

// Reads tasks from localStorage
export const loadTasksFromLocalStorage = (): Task[] => {
    // Get items from storage
    const tasksJSON = localStorage.getItem("tasks");
    // return the items or an empty array
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}

// Delete a task by ID from localStorage
export const deleteTaskFromLocalStorage = (taskId: string) => {
    // loads tasks from storage and stores them in tasks variable
    const tasks: Task[] = loadTasksFromLocalStorage();
    // filter tasks and checks if its the task id that is deleted
    const updatedTasks = tasks.filter((task => task.id !== taskId));
    // update the tasks with the saveTasksToLocalStorage function
    saveTasksToLocalStorage(updatedTasks);
    // return updated tasks
    return updatedTasks;
}

// Update a task by ID in localStorage
export const updateTaskInLocalStorage = (updatedTask: Task) => {
    // Load all existing tasks
    const tasks: Task[] = loadTasksFromLocalStorage();

    // Map through tasks and replace the one that matches the ID
    const newTaskList = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);

    // Save updated list
    saveTasksToLocalStorage(newTaskList);

    // Return new list so React can update state
    return newTaskList;
}