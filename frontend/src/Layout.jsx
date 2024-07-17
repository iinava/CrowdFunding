import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./components/shared/NavBar";
import NavbarNextUI from "./components/shared/NavBar";
import api from "./lib/api";

function Layout() {
  return (
    <div className="layout w-full  ">
      <div className="navbar">
        <NavbarNextUI />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}


export { Layout };
