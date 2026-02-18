export type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "member";
};

export type Task = {
  id: string;
  title: string;
  done: boolean;
  assignedTo: number;
};
export type TaskState = {
  tasks: Task[];
  users: User[];
};
export type TaskAction =
  | {
      type: "add";
      payload: Task;
    }
  | {
      type: "toggle";
      payload: string;
    }
  | {
      type: "remove";
      payload: string;
    };
export type TPage = "tasks" | "users";
