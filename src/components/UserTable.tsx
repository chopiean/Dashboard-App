import { useTasks } from "../context/TaskContext";
import { useMemo } from "react";

type Props = { search?: string };

const UserTable = ({ search }: Props) => {
  const {
    state: { users },
  } = useTasks();

  const term = search?.toLowerCase().trim() ?? "";

  const filtered = useMemo(() => {
    if (!term) return users;

    return users.filter((u) => {
      return (
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.role.toLowerCase().includes(term) ||
        u.id.toString().includes(term)
      );
    });
  }, [users, term]);

  return (
    <div className="overflow-x-auto bg-gray-800 rounded shadow">
      <table className="min-w-full text-left ">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((user) => (
            <tr key={user.id} className="border-t border-gray-700">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
            </tr>
          ))}

          {filtered.length === 0 && (
            <tr>
              <td colSpan={4} className="p-3 text-gray-500 text-center">
                User not found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
