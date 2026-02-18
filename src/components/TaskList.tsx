import { useMemo } from "react";
import { useTasks } from "../context/TaskContext";

type Props = {
  search: string;
};

const TaskList = ({ search }: Props) => {
  const {
    state: { tasks, users },
    dispatch,
  } = useTasks();

  const filteredTasks = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter((t) => t.title.toLowerCase().includes(q));
  }, [tasks, search]);

  return (
    <div className="bg-gray-800 rounded shadow divide-gray-200">
      {filteredTasks.length === 0 && (
        <div className="p-4 text-gray-500">No tasks found</div>
      )}
      {filteredTasks.map((t) => (
        <div key={t.id} className="flex justify-between items-center p-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={t.done}
              aria-label="toggle check"
              onChange={() =>
                dispatch({
                  type: "toggle",
                  payload: t.id,
                })
              }
            ></input>
            <span className={t.done ? "line-through" : ""}>{t.title}</span>
            <small className="text-gray-500 ">
              {users.find((u) => u.id === t.assignedTo)?.name}
            </small>
          </div>
          <button
            className="text-red-600 hover:underline hover:cursor-pointer"
            onClick={() =>
              dispatch({
                type: "remove",
                payload: t.id,
              })
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
