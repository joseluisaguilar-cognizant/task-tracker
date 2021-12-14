import TaskElement from "./TaskElement/TaskElement";

const Tasks = ({ tasks }) => {
  return (
    <>
      {tasks.map((task) => (
        // This way is the best option to pass down all the props
        <TaskElement key={task.id} {...task} />
      ))}
    </>
  );
};

export default Tasks;
