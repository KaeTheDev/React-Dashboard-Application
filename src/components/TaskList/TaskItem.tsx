import React from "react";
import type { TaskItemProps, TaskStatus } from "../../types";

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onStatusChange,
  onDelete,
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-orange-500";
      case "high":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start bg-black w-full py-2 px-4 rounded">
      <div className="flex flex-col">
        <p className="text-lg text-white">{task.title}</p>
        <p className="text-md text-gray-500">{task.description}</p>
        <p className="text-sm text-white">
          <span className={getPriorityColor(task.priority)}>
            Priority: {task.priority}
          </span>
          <span className="text-gray-400 ml-2">Due: {task.dueDate}</span>
        </p>
      </div>

      {/* Status Selector */}
      <select
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
        className="bg-gray-800 text-white px-2 py-1 rounded ml-auto"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In-Progress</option>
        <option value="completed">Completed</option>
      </select>

      <button
        className="text-md text-red-600"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </div>
  );
};
