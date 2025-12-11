import React from "react";
import { useState } from "react";
import type { TaskFormData, TaskFormProps, Task } from "../../types";
import { saveTaskToLocalStorage } from "../../utils/taskUtils";
import { v4 as uuid } from "uuid";

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  initialData,
}) => {
  // Using an object to capture all form data with useState
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    status: "pending",
    priority: "low",
    dueDate: "",
  });

  // handleChange event handler for information
  // HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement means this handler can handle inputs, selects, or textareas — all the elements in your form.
  // TypeScript would complain without this when you try to access e.target.value or e.target.name
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    // destructure the name and value
    const { name, value } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const taskWithId: Task = {
      ...formData,
      id: uuid()
    }

    const updatedTasks = saveTaskToLocalStorage(taskWithId);

    onSubmit(taskWithId);
    setFormData({ title: "", description: "", status: "pending", priority: "low", dueDate: ""});
    console.log("Task saved!", updatedTasks);
  };

  return (
    <div className="h-screen flex justify-center items-center">
    <form onSubmit={handleSubmit} className="flex flex-col w-200 border border-solid px-4 py-4">
    <h1 className="flex justify-center text-4xl mb-3">React Task Form</h1>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="px-2 py-4 border border-solid mb-3"/>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Task Description" className="px-2 py-4 border border-solid mb-3" />
        <select name="status" value={formData.status} onChange={handleChange} className="px-2 py-4 border border-solid mb-3">
            <option value="pending">Pending</option>
            <option value="in-progress">In-Progress</option>
            <option value="completed">Completed</option>
        </select>

        <select name="priority" value={formData.priority} onChange={handleChange} className="px-2 py-4 border border-solid mb-3">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
        <input name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} className="px-2 py-4 border border-solid mb-3"/>
      <button type="submit" className="bg-green-500 hover:bg-green-700 text-white px-2 py-4">Submit Task</button>
    </form>
    </div>
  );
};

// COMPONENT NOTES
// Implement initialData for edit