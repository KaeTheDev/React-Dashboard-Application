import React from "react";
import type { Task, TaskStatus, TaskPriority, TaskStatsProps } from "../../types";

export const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
    const total = tasks.length;
    
    const statusCount = {
      completed: 0,
      "in-progress": 0,
      pending: 0,
    } as Record<TaskStatus, number>;
  
    const priorityCount = {
      low: 0,
      medium: 0,
      high: 0,
    } as Record<TaskPriority, number>;
  
    tasks.forEach(task => {
      statusCount[task.status]++;
      priorityCount[task.priority]++;
    });
  
    return (
        <div className="border p-4 rounded bg-gray-100 my-4 w-full max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">Task Stats</h2>
      
          <div className="flex justify-between mb-4">
            <div>
              <h3 className="font-medium mb-1">Status</h3>
              <p>Total: {total}</p>
              <p>Completed: {statusCount.completed}</p>
              <p>In Progress: {statusCount["in-progress"]}</p>
              <p>Pending: {statusCount.pending}</p>
            </div>
      
            <div>
              <h3 className="font-medium mb-1">Priority</h3>
              <p>Low: {priorityCount.low}</p>
              <p>Medium: {priorityCount.medium}</p>
              <p>High: {priorityCount.high}</p>
            </div>
          </div>
        </div>
      );
    };      