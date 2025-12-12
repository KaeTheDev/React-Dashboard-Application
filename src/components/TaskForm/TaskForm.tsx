import React, { useState, useEffect } from "react";
import type { TaskFormProps, TaskFormData, Task } from "../../types";
import { v4 as uuid } from "uuid";
import { saveTaskToLocalStorage, updateTaskInLocalStorage, validateTaskForm } from "../../utils/taskUtils";

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    status: "pending",
    priority: "low",
    dueDate: "",
  });

  // Prefill form if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        status: initialData.status,
        priority: initialData.priority,
        dueDate: initialData.dueDate,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate form
    const { valid, errors } = validateTaskForm(formData);
    if (!valid) {
      alert(errors.join("\n")); // simple alert for now
      return;
    }
  
    let task: Task;
    if (initialData) {
      // EDIT
      task = { ...initialData, ...formData };
      updateTaskInLocalStorage(task);
    } else {
      // CREATE
      task = { ...formData, id: uuid() };
      saveTaskToLocalStorage(task);
    }
  
    onSubmit(task);
  
    // Reset form only for create mode
    if (!initialData) {
      setFormData({ title: "", description: "", status: "pending", priority: "low", dueDate: "" });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md border px-4 py-4 mx-auto">
      <h1 className="text-2xl mb-3">{initialData ? "Edit Task" : "New Task"}</h1>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="mb-2 p-2 border"/>
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="mb-2 p-2 border"/>
      <select name="status" value={formData.status} onChange={handleChange} className="mb-2 p-2 border">
        <option value="pending">Pending</option>
        <option value="in-progress">In-Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select name="priority" value={formData.priority} onChange={handleChange} className="mb-2 p-2 border">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} className="mb-2 p-2 border"/>
      <button type="submit" className="bg-green-500 text-white p-2">{initialData ? "Update Task" : "Add Task"}</button>
    </form>
  );
};