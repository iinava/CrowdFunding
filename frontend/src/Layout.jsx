import { Outlet } from "react-router-dom";
import NavbarNextUI from "./components/shared/NavBar";
import api from "./lib/api";

function Layout() {
  return (
    <div className="flex flex-col  w-full space-y-4">
      <div className="navbar">
        <NavbarNextUI />
      </div>
      <div className="pt-20 w-full  min-h-screen px-[2vw]">
        <Outlet />
      </div>
    </div>
  );
}


export { Layout };
