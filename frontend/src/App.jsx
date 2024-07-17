import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Layout} from "./Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/auth/NotFound";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import Profile from "./pages/profile/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
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
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
