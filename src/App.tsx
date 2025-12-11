import { useEffect, useState } from "react";
import { TaskForm } from "./components/TaskForm/TaskForm";
import { TaskList } from "./components/TaskList/TaskList";
import type { Task, TaskFormData, TaskStatus } from "./types";
import { v4 as uuid } from "uuid";
import { loadTasksFromLocalStorage } from "./utils/taskUtils";
import { deleteTaskFromLocalStorage } from "./utils/taskUtils";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load saved tasks when the page loads
  useEffect(() => {
    const saved = loadTasksFromLocalStorage();
    setTasks(saved);
  }, []);

  const handleTaskSubmit = (task: TaskFormData) => {
    // Convert TaskFormData -> Task (with ID)
    const newTask: Task = {
      ...task,
      id: uuid()
    };

    // Add new task into React state
    setTasks(prev => {
      const updatedTasks = [...prev, newTask];

      localStorage.setItem("tasks", JSON.stringify(updatedTasks))

      return updatedTasks;
    })

  };

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev =>
      prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t)
    );
  };

  const handleDelete = (taskId: string) => {
   // Delete from localStorage first and get updated tasks
   const updatedTasks = deleteTaskFromLocalStorage(taskId);

   // Update React state
   setTasks(updatedTasks);
  };

  return (
    <>
     <div className="p-4 flex flex-col md:flex-row gap-4">
    
    <div className="md:w-1/2">
    <TaskForm onSubmit={handleTaskSubmit} />
    </div>
 
      <div className="md:w-2/2 flex flex-col gap-4">
      <TaskList 
      tasks={tasks}
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
      />

      </div>
      </div>
    </>
  );
}

export default App;