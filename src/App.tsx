import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header/Header";
import Tasks from "./components/Tasks/Tasks";
import AddTask from "./components/AddTask/AddTask";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";

import Task from "./interfaces/taskInterface";

const TASK_URL = "http://localhost:5000/tasks";

const headers = {
  "Content-type": "application/json",
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddTask, setShowAddTask] = useState<boolean>(false);

  useEffect(() => {
    const storeTasks = async (): Promise<void> => {
      const tasks = await fetchTasks();

      setTasks(tasks);
    };

    void storeTasks();
  }, []);

  const fetchTasks = async (): Promise<Task[]> => {
    const res = await axios.get(TASK_URL, {
      headers,
    });
    return res.data;
  };

  const fetchSpecificTask = async (id: number): Promise<Task> => {
    const res = await axios.get(`${TASK_URL}/${id}`, { headers });
    return res.data;
  };

  const addTask = async (task: string): Promise<void> => {
    const { data: newTask } = await axios.post<Task>(TASK_URL, task, {
      headers,
    });

    setTasks((prevTasks: Task[]) => [...prevTasks, newTask]);
  };

  const deleteTask = (id: number): void => {
    axios.delete<void>(`${TASK_URL}/${id}`, { headers });

    setTasks((prevTasks: Task[]) =>
      prevTasks.filter((task: Task): boolean => task.id !== id)
    );
  };

  const toggleReminder = async (id: number): Promise<void> => {
    const taskToToggle = await fetchSpecificTask(id);

    const res = await axios.put<Task>(`${TASK_URL}/${id}`, {
      ...taskToToggle,
      reminder: !taskToToggle.reminder,
    });

    const taskUpdated = res.data;

    setTasks((prevTaks: Task[]): Task[] =>
      prevTaks.map((task) => (task.id === id ? taskUpdated : task))
    );
  };

  const toggleFormVisualization = (): void =>
    setShowAddTask((prevShowForm: boolean): boolean => !prevShowForm);

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
