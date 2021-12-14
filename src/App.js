import { useState } from "react";

import Header from "./components/Header/Header";
import Tasks from "./components/Tasks/Tasks";
import { taskList } from "./components/Tasks/TasksData";

function App() {
  const [tasks, setTasks] = useState(taskList);

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <Header />
      <Tasks tasks={tasks} onDelete={deleteTask} />
    </div>
  );
}

export default App;
