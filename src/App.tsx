import { useEffect, useState } from "react";
import { TaskForm } from "./components/TaskForm/TaskForm";
import { TaskItem } from "./components/TaskList/TaskItem";
import type { Task, TaskFormData } from "./types";
import { v4 as uuid } from "uuid";
import { loadTasksFromLocalStorage } from "./utils/taskUtils";

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

  return (
    <>
      <TaskForm onSubmit={handleTaskSubmit} />
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={(taskId, newStatus) => {
            setTasks(prev =>
              prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t)
              )
          }}
          onDelete={(taskId) => {
            setTasks(prev => prev.filter(t => t.id !== taskId));
          }}
        />
      ))}
    </>
  );
}

export default App;