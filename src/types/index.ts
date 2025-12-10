export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface TaskFormData {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
}

export interface TaskFormProps {
    onSubmit: (task: TaskFormData) => void;
    initialData?: TaskFormData;
}