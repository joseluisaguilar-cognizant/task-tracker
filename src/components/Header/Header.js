import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "../Button/Button";

const Header = ({ title, onToggleForm, showAddTask }) => {
  const location = useLocation();

  return (
    <header className="header">
      {/* <h2 style={headerStyle}>Hello {title}</h2> */}
      <h2>{title}</h2>
      {location.pathname === "/" && (
        <Button
          onClick={onToggleForm}
          color={showAddTask ? "red" : "green"}
          text={showAddTask ? "Close" : "Add"}
          clickEvent={onToggleForm}
        />
      )}
    </header>
  );
};

// --- CSS IN JS ---
// This style method is better to be used when we have
// to add some dynamic styling
// const headerStyle = {
//   color: "red",
//   backgroundColor: "darkblue",
// };

// --- DEFAULT PROPS ---
// It could be better to use default arguments
// instead of "defaultProps" property
Header.defaultProps = {
  title: "To do list",
};

// --- PROP TYPES ---
Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
