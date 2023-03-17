import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const BaseLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default BaseLayout;
