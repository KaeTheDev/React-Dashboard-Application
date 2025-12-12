import { useState, useEffect } from "react";
import { TaskForm } from "./components/TaskForm/TaskForm";
import { TaskList } from "./components/TaskList/TaskList";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { TaskFilter } from "./components/TaskFilter/TaskFilter";
import { TaskStats } from "./components/TaskStats/TaskStats";
import type { Task, TaskStatus } from "./types";
import { loadTasksFromLocalStorage, deleteTaskFromLocalStorage } from "./utils/taskUtils";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<{ status?: TaskStatus; priority?: 'low' | 'medium' | 'high' }>({});

  useEffect(() => {
    setTasks(loadTasksFromLocalStorage());
  }, []);

  // Handle create/edit
  const handleSubmit = (task: Task) => {
    if (editingTask) {
      setTasks(prev => prev.map(t => t.id === task.id ? task : t));
      setEditingTask(null);
    } else {
      setTasks(prev => [...prev, task]);
    }
  };

  const handleStatusChange = (taskId: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
  };

  const handleDelete = (taskId: string) => {
    const updated = deleteTaskFromLocalStorage(taskId);
    setTasks(updated);
  };

  const handleEdit = (task: Task) => setEditingTask(task);

  // Apply filters
  const filteredTasks = tasks.filter(task => {
    let matches = true;
    if (filters.status) matches = matches && task.status === filters.status;
    if (filters.priority) matches = matches && task.priority === filters.priority;
    return matches;
  });

  return (
    <>
      <h1 className="flex justify-center text-4xl mb-6">React Task Dashboard</h1>
      <Dashboard>
        {/* Task Form */}
        <div className="w-full max-w-4xl mx-auto">
          <TaskForm onSubmit={handleSubmit} initialData={editingTask || undefined} />
        </div>

        {/* Task Stats */}
      <div className="md:w-1/2 w-full">
      <TaskStats tasks={tasks} />
      </div>
  
        {/* Task List */}
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
          <TaskFilter
            onFilterChange={(newFilters) =>
              setFilters((prev) => ({ ...prev, ...newFilters }))
            }
          />
          <TaskList
            tasks={filteredTasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </Dashboard>
    </>
  );  
}

export default App;