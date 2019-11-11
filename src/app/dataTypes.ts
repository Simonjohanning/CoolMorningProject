export interface Project {
    id: string;
    title: string;
    description: string;
    goal: string;
    memberIds: string[];
    taskIds: string[];
}