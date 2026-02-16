import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { TaskAction, TaskState } from "../type";
import { useLocalStorage } from "../hooks/useLocalStorage";

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "add":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "toggle":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload
            ? {
                ...t,
                done: !t.done,
              }
            : t
        ),
      };

    case "remove":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };
    default:
      return state;
  }
}
const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
} | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [persistedState, setPersistedState] = useLocalStorage<TaskState>(
    "dashboard-state",
    {
      tasks: [
        {
          id: 1,
          title: "learn TS",
          done: false,
          assignedTo: 1,
        },
      ],
      users: [
        {
          id: 1,
          name: "dunglv",
          email: "dunglv@gmail.com",
          role: "admin",
        },
      ],
    }
  );
  const [state, dispatch] = useReducer(taskReducer, persistedState);

  useEffect(() => {}, [state, setPersistedState]);

  return (
    <TaskContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) throw new Error("useTasks must be used inside TaskProvider");

  return context;
}
