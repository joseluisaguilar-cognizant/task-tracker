import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header/Header";
import Tasks from "./components/Tasks/Tasks";
import AddTask from "./components/AddTask/AddTask";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";

const TASK_URL = "http://localhost:5000/tasks";

const headers = {
  "Content-type": "application/json",
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
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
    <Router>
      <div className="container">
        <Header
          onToggleForm={toggleFormVisualization}
          showAddTask={showAddTask}
        />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                {showAddTask ? <AddTask onAddTask={addTask} /> : null}
                {/* There is a controversy of wheter to use "&&" instead of ternary expression*/}
                {tasks.length ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggleReminder={toggleReminder}
                  />
                ) : (
                  <p>No tasks to show</p>
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
