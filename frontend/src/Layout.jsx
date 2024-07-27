import { Navigate, Outlet } from "react-router-dom";
import NavbarNextUI from "./components/shared/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./features/authSlice";
import { useEffect } from "react";
import UserNavbar from "./components/shared/UserNavBar";

function Layout() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

//if aldready authorized then navigate to dashboard , user should manually logout only to visit those pages again

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }
  return isAuthorized ? (
    <Navigate to="/dashboard" />
  ) : (
    <div className="flex flex-col  w-full space-y-4">
      <div className="navbar">
        <NavbarNextUI />
      </div>
      <div className=" w-full  min-h-screen ">
        <Outlet />
      </div>
    </div>
  );
}

function ProtectedRoute() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }
  
//if not logged in navigate to login / register page

  return !isAuthorized ? (
    <Navigate to="/login" />
  ) : (
    <div className=" flex flex-col  min-h-screen w-full space-y-4">
      <div className="navbar">
        <UserNavbar />
      </div>
      <div className=" pt-20 w-full px-[4vw]">
        <Outlet />
      </div>
    </div>
  );
}

export { Layout, ProtectedRoute };
