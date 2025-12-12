// import { useEffect, useState } from "react";
// import { TaskForm } from "./components/TaskForm/TaskForm";
// import { TaskList } from "./components/TaskList/TaskList";
// import { Dashboard } from "./components/Dashboard/Dashboard";
// import type { Task, TaskFormData, TaskStatus } from "./types";
// import { v4 as uuid } from "uuid";
// import { loadTasksFromLocalStorage } from "./utils/taskUtils";
// import { deleteTaskFromLocalStorage } from "./utils/taskUtils";
// import { TaskFilter } from "./components/TaskFilter/TaskFilter";

// function App() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [filters, setFilters] = useState<{
//     status?: TaskStatus;
//     priority?: "low" | "medium" | "high";
//   }>({});

//   // Load saved tasks when the page loads
//   useEffect(() => {
//     const saved = loadTasksFromLocalStorage();
//     setTasks(saved);
//   }, []);

//   const handleTaskSubmit = (task: TaskFormData) => {
//     // Convert TaskFormData -> Task (with ID)
//     const newTask: Task = {
//       ...task,
//       id: uuid(),
//     };

//     // Add new task into React state
//     setTasks((prev) => {
//       const updatedTasks = [...prev, newTask];

//       localStorage.setItem("tasks", JSON.stringify(updatedTasks));

//       return updatedTasks;
//     });
//   };

//   const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
//     setTasks((prev) =>
//       prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
//     );
//   };

//   const handleDelete = (taskId: string) => {
//     // Delete from localStorage first and get updated tasks
//     const updatedTasks = deleteTaskFromLocalStorage(taskId);

//     // Update React state
//     setTasks(updatedTasks);
//   };

//   // Filter Task before passing to TaskList
//   const filteredTasks = tasks.filter((task) => {
//     let matches = true;

//     if (filters.status) {
//       matches = matches && task.status === filters.status;
//     }
//     if (filters.priority) {
//       matches = matches && task.priority === filters.priority;
//     }

//     return matches;
//   });

//   return (
//     <>
//       <h1 className="flex justify-center text-4xl mb-3">React Task Dashboard</h1>
//       <Dashboard>
//         <div className="md:w-1/2">
//           <TaskForm onSubmit={handleTaskSubmit} />
//         </div>

//         <div className="md:w-1/2 flex flex-col gap-4">
//           <TaskFilter
//             onFilterChange={(newFilters) =>
//               setFilters((prev) => ({ ...prev, ...newFilters }))
//             }
//           />
//           <TaskList
//             tasks={filteredTasks}
//             onStatusChange={handleStatusChange}
//             onDelete={handleDelete}
//           />
//         </div>
//       </Dashboard>
//     </>
//   );
// }

// export default App;

// import { useState, useEffect } from "react";
// import { TaskForm } from "./components/TaskForm/TaskForm";
// import { TaskList } from "./components/TaskList/TaskList";
// import type { Task, TaskStatus } from "./types";
// import { loadTasksFromLocalStorage, deleteTaskFromLocalStorage} from "./utils/taskUtils";

// function App() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [editingTask, setEditingTask] = useState<Task | null>(null);

//   useEffect(() => {
//     setTasks(loadTasksFromLocalStorage());
//   }, []);

//   const handleSubmit = (task: Task) => {
//     if (editingTask) {
//       // Update task
//       setTasks(prev => prev.map(t => t.id === task.id ? task : t));
//       setEditingTask(null);
//     } else {
//       // Add task
//       setTasks(prev => [...prev, task]);
//     }
//   };

//   const handleStatusChange = (taskId: string, status: TaskStatus) => {
//     setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
//   };

//   const handleDelete = (taskId: string) => {
//     const updated = deleteTaskFromLocalStorage(taskId);
//     setTasks(updated);
//   };

//   const handleEdit = (task: Task) => setEditingTask(task);

//   return (
//     <div className="flex flex-col items-center">
//       <TaskForm onSubmit={handleSubmit} initialData={editingTask || undefined} />
//       <TaskList tasks={tasks} onStatusChange={handleStatusChange} onDelete={handleDelete} onEdit={handleEdit} />
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import { TaskForm } from "./components/TaskForm/TaskForm";
import { TaskList } from "./components/TaskList/TaskList";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { TaskFilter } from "./components/TaskFilter/TaskFilter";
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
        {/* Form Column */}
        <div className="w-full max-w-4xl mx-auto">
          <TaskForm onSubmit={handleSubmit} initialData={editingTask || undefined} />
        </div>
  
        {/* List Column */}
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