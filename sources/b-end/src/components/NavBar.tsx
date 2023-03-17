import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav>
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1em",
            listStyle: "none",
            paddingLeft: "0",
          }}
        >
          <li>
            <Link to="counter">Counter</Link>
          </li>
          <li>
            <Link to="form">Form</Link>
          </li>
          <li>
            <Link to="table">Table</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
