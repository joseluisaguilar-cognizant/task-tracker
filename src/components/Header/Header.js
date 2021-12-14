import PropTypes from "prop-types";
import Button from "../Button/Button";

const Header = ({ title }) => {
  const onClick = (e) => {
    console.log("do something", e);
  };

  return (
    <header className="header">
      {/* <h2 style={headerStyle}>Hello {title}</h2> */}
      <h2>Hello {title}</h2>
      <Button color="green" text="Add" clickEvent={onClick} />
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
  title: "Task Tracker",
};

// --- PROP TYPES ---
Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
