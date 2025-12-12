import React from "react";
import type { TaskListProps } from "../../types";
import { TaskItem } from "./TaskItem";

export const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onStatusChange,
    onDelete,
    onEdit
}) => {
    return (
        <div className="flex flex-col gap-4">
            {tasks.map((task) => (
                <TaskItem 
                key={task.id}
                task={task}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
                onEdit={onEdit}
                />
            ))}
        </div>
    )
}