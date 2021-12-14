import { FaTimes } from "react-icons/fa";

const TaskElement = ({
  id,
  reminder,
  day,
  text,
  onDelete,
  onToggleReminder,
}) => {
  return (
    <div
      onDoubleClick={() => onToggleReminder(id)}
      className={`task ${reminder ? "reminder" : ""}`}
    >
      <h3>
        {text}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(id)}
        />
      </h3>
      <p>{day}</p>
    </div>
  );
};

export default TaskElement;
