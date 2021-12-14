import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components/Header/Header";
import Tasks from "./components/Tasks/Tasks";
import AddTask from "./components/AddTask/AddTask";

const TASK_URL = "http://localhost:5000/tasks";

const headers = {
  "Content-type": "application/json",
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    // axios.get(TASK_URL, headers).then((res) => {
    //   console.log(res.json());
    //   setTasks(res.data);
    // });

    // -> It would be better using async-await
    const storeTasks = async () => {
      const tasks = await fetchTasks();

      setTasks(tasks);
    };

    storeTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(TASK_URL, {
      headers,
    });
    return res.data;
  };

  const fetchSpecificTask = async (id) => {
    const res = await axios.get(`${TASK_URL}/${id}`, { headers });
    return res.data;
  };

  const addTask = async (task) => {
    const { data: newTask } = await axios.post(TASK_URL, task, { headers });

    setTasks((prevTasks) => {
      return [...prevTasks, newTask];
    });
  };

  const deleteTask = (id) => {
    axios.delete(`${TASK_URL}/${id}`, { headers });

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchSpecificTask(id);

    console.log(taskToToggle);

    const res = await axios.put(`${TASK_URL}/${id}`, {
      ...taskToToggle,
      reminder: !taskToToggle.reminder,
    });

    const taskUpdated = res.data;

    setTasks((prevTaks) => {
      return prevTaks.map((task) => (task.id === id ? taskUpdated : task));
    });
  };

  const toggleFormVisualization = () =>
    setShowAddTask((prevShowForm) => !prevShowForm);

  return (
    <div className="container">
      <Header
        onToggleForm={toggleFormVisualization}
        showAddTask={showAddTask}
      />
      {/* There is a controversy of wheter to use "&&" instead of ternary expression*/}
      {showAddTask ? <AddTask onAddTask={addTask} /> : null}
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
