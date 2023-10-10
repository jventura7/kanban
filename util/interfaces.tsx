export interface BoardsType {
  boards: {
    name: string;
    columns: {
      name: string;
      tasks?: {
        title: string;
        description: string;
        status: string;
        subtasks: {
          title: string;
          isCompleted: boolean;
        }[];
      }[];
    }[];
  }[];
}

export interface BoardType {
  name: string;
  columns: {
    name: string;
    tasks?: {
      title: string;
      description: string;
      status: string;
      subtasks: {
        title: string;
        isCompleted: boolean;
      }[];
    }[];
  }[];
}

export interface TaskType {
  title: string;
  description: string;
  status: string;
  subtasks: {
    title: string;
    isCompleted: boolean;
  }[];
}
