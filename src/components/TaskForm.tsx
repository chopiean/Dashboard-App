import React from "react";
import { useTasks } from "../context/TaskContext";

type Props = {};

const TaskForm = (props: Props) => {
  const {
    state: { users },
  } = useTasks();
  return (
    <form className="flex gap-2 bg-gray-700 p-4 rounded mb-4">
      <input
        type="text"
        placeholder="Task title"
        className="flex-1 p-2 rounded border bg-gray-800 border-gray-700"
      ></input>
      <select className="p-2 rounded border-gray-700 bg-gray-800">
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        ADD
      </button>
    </form>
  );
};

export default TaskForm;
