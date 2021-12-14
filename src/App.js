import { useState } from "react";

import Header from "./components/Header/Header";
import Tasks from "./components/Tasks/Tasks";
import { taskList } from "./components/Tasks/TasksData";

function App() {
  const [tasks, setTasks] = useState(taskList);

  return (
    <div className="container">
      <Header />
      <Tasks tasks={tasks} />
    </div>
  );
}

export default App;
