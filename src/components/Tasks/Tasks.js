import TaskElement from "./TaskElement/TaskElement";

const Tasks = ({ tasks, onDelete }) => {
  return (
    <>
      {tasks.map((task) => (
        // This way is the best option to pass down all the props
        <TaskElement key={task.id} {...task} onDelete={onDelete} />
      ))}
    </>
  );
};

export default Tasks;
