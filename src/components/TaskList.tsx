import React, { useMemo, useState } from "react";
import { useTasks } from "../context/TaskContext";

type Props = {};

const TaskList = (props: Props) => {
  const {
    state: { tasks, users },
    dispatch,
  } = useTasks();

  const [query, setQuery] = useState("");

  const filteredTasks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter((t) => t.title.toLowerCase().includes(q));
  }, [tasks, query]);

  return (
    <div className="bg-gray-800 rounded shadow divide-gray-200">
      <div className="p-3 border-b border-gray-700">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tasks..."
          className="w-full px-3 py-2 rounded bg-gray-900 text-gray-100 border-gray-700"
        ></input>
      </div>

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
