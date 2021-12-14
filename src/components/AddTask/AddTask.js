import { useState } from "react";

const initialFormState = {
  text: "",
  day: "",
  reminder: false,
};

const AddTask = ({ onAddTask }) => {
  const [form, setForm] = useState(initialFormState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.text) {
      alert("Please, add a task");
      return;
    }
    onAddTask(form);
    setForm(initialFormState);
  };

  const handleInput = (e) => {
    setForm((prevValue) => {
      return { ...prevValue, [e.target.name]: e.target.value };
    });
  };

  const handleCheckbox = (e) => {
    setForm((prevValue) => {
      return { ...prevValue, [e.target.name]: e.target.checked };
    });
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="text">Task</label>
        <input
          type="text"
          name="text"
          id="text"
          value={form.text}
          onChange={handleInput}
          placeholder="Add text"
          autoComplete="off"
        />
      </div>
      <div className="form-control">
        <label htmlFor="day">Date & Time</label>
        <input
          type="text"
          name="day"
          id="day"
          placeholder="Add Day & Time"
          value={form.day}
          onChange={handleInput}
          autoComplete="off"
        />
      </div>
      <div className="form-control form-control-check">
        <label htmlFor="reminder">Set Reminder</label>
        <input
          type="checkbox"
          name="reminder"
          id="reminder"
          checked={form.reminder}
          onChange={handleCheckbox}
        />
      </div>
      {/* <input type="button" value="Save Task" className="btn btn-block" /> */}
      <button type="submit" className="btn btn-block">
        Save Task
      </button>
    </form>
  );
};

export default AddTask;
