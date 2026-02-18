import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { TaskProvider } from "./context/TaskContext";
import UserTable from "./components/UserTable";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import type { TPage } from "./type";
import TaskForm from "./components/TaskForm";

function App() {
  const [userQuery, setUserQuery] = useState("");
  const [page, setPage] = useState<TPage>("tasks");
  return (
    <TaskProvider>
      <div className="flex h-screen bg-gray-900 text-gray-100">
        <Sidebar
          onNavigate={(p) => {
            setPage(p);
          }}
        ></Sidebar>
        <div className="flex flex-col flex-1">
          <Header></Header>

          <main className="p-4 overflow-y-auto flex-1">
            {page === "tasks" ? (
              <TaskForm></TaskForm>
            ) : (
              <>
                <SearchBar
                  onDebounceChange={setUserQuery}
                  placeholder="Search..."
                ></SearchBar>
                <UserTable search={userQuery}></UserTable>
              </>
            )}
          </main>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
