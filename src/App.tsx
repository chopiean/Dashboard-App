import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <TaskProvider>
      <div className="flex h-screen bg-gray-900 text-gray-100">
        <Sidebar></Sidebar>
        <div className="flex flex-col flex-1">
          <Header></Header>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
