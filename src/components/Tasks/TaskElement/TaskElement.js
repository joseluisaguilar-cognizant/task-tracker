import { FaTimes } from "react-icons/fa";

const TaskElement = ({ id, day, reminder, text, onDelete }) => {
  return (
    <div className="task">
      <h3>
        {text}{" "}
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
