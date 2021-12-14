const TaskElement = ({ day, reminder, text }) => {
  return (
    <div className="task">
      <h3>{text}</h3>
      <p>{day}</p>
    </div>
  );
};

export default TaskElement;
