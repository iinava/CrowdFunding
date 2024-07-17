import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Layout} from "./Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/auth/NotFound";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import Profile from "./pages/profile/Profile";
import Dashboard from "./pages/home/Dashboard";
import LandingPage from "./pages/Landing/LandingPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <LandingPage />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
        },{
          path:"*",
          element: <NotFound/>
        }
      ]
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "profile",
          element: <Profile/>
        },
        {
          path: "dashboard",
          element: <Dashboard/>
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
