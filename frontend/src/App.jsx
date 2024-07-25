import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Layout} from "./Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/auth/NotFound";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import Profile from "./pages/profile/Profile";
import Dashboard from "./pages/home/Dashboard";
import LandingPage from "./pages/Landing/LandingPage";
import CampaignDetails from "./pages/home/CampaignDetails";
import CategoryDashboard from "./pages/home/CategoryDashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "",
          element: <LandingPage />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
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
        },
        {
          path:"campaigns/:slug",
          element:<CampaignDetails/>
        },
        {
          path:"campaign/category/:category",
          element:<CategoryDashboard/>
        }
        ,{
          path:"*",
          element: <NotFound/>
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
