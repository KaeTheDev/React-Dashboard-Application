export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
}

export interface TaskItemProps {
    task: Task;
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
    onDelete: (taskId: string) => void;
    onEdit: (task: Task) => void;
}

export interface TaskListProps {
    tasks: Task[];
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
    onDelete: (taskId: string) => void;
    onEdit: (task: Task) => void; 
}

export interface TaskFormData {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
  }

  export interface TaskFormProps {
    onSubmit: (task: Task) => void;   
    initialData?: Task;              
  }

export interface DashboardProps {
    children: React.ReactNode;
}

export interface TaskFilterProps {
    onFilterChange: (filters: {
        status?: TaskStatus;
        priority?: 'low' | 'medium' | 'high';
    }) => void;
}

export interface TaskStatsProps {
    tasks: Task[];
}