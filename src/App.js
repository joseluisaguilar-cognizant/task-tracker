import { useState } from "react";

import Header from "./components/Header/Header";
import Tasks from "./components/Tasks/Tasks";
import AddTask from "./components/AddTask/AddTask";
import { taskList } from "./components/Tasks/TasksData";

function App() {
  const [tasks, setTasks] = useState(taskList);

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleReminder = (id) => {
    setTasks((prevTaks) => {
      return prevTaks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      );
    });
  };

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 1000);
    setTasks((prevTasks) => {
      return [...prevTasks, { ...task, id }];
    });
  };

  return (
    <div className="container">
      <Header />
      <AddTask onAddTask={addTask} />
      {tasks.length ? (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          onToggleReminder={toggleReminder}
        />
      ) : (
        <p>No tasks to show</p>
      )}
    </div>
  );
}

export default App;
