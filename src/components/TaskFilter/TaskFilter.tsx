import React from "react";
import type { TaskFilterProps, TaskStatus } from "../../types";

export const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  return (
    <div className="flex gap-4 bg-gray-900 p-4 rounded">
      {/* Status Filter */}
      <div>
        <label className="text-white mr-2">Status:</label>
        <select
          onChange={(e) =>
            onFilterChange({
              status: (e.target.value || undefined) as TaskStatus | undefined,
            })
          }
          className="bg-gray-800 text-white px-2 py-1 rounded"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Priority Filter */}

      <div>
        <label className="text-white mr-2">Priority:</label>
        <select
        onChange={(e) => 
            onFilterChange({
                priority: (e.target.value || undefined) as | "low" | "medium" | "high" | undefined
            })
        }
        className="bg-gray-800 text-white px-2 py-1 rounded"
        >
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
      </div>
    </div>
  );
};