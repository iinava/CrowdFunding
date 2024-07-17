import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../../lib/api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../lib/constants";
import { useState, useEffect } from "react";
import UserNavbar from "../../components/shared/UserNavBar";

function ProtectedRoute() {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/user/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return !isAuthorized ? (
    <Navigate to="/login" />
  ) : (
    <div className=" flex flex-col  min-h-screen w-full space-y-4">
      <div className="navbar">
      <UserNavbar/>
      </div>
      <div className=" pt-20 w-full px-[2vw]">
        <Outlet />
      </div>
    </div>
  );
}

export default ProtectedRoute;
