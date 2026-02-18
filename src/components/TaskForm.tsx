import React from "react";
import { useTasks } from "../context/TaskContext";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Task } from "../type";

type Props = {};

const schema = z.object({
  title: z.string().min(2, "Title too short"),
  assignedTo: z.number(),
});
type FormData = z.infer<typeof schema>;

const TaskForm = (props: Props) => {
  const {
    state: { users },
    dispatch,
  } = useTasks();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    const newTask: Task = {
      id: Date.now(),
      title: data.title,
      done: false,
      assignedTo: data.assignedTo,
    };

    dispatch({
      type: "add",
      payload: newTask,
    });

    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-2 bg-gray-700 p-4 rounded mb-4"
    >
      <input
        {...register("title")}
        type="text"
        placeholder="Task title"
        className="flex-1 p-2 rounded border bg-gray-800 border-gray-700"
      ></input>
      <select
        {...register("assignedTo", {
          valueAsNumber: true,
        })}
        className="p-2 rounded border-gray-700 bg-gray-800"
      >
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

      {errors.title && (
        <span className="text-red-500 text-sm">{errors.title.message}</span>
      )}
    </form>
  );
};

export default TaskForm;
