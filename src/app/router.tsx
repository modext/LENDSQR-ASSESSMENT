import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";

import { AuthLayout } from "../layouts/AuthLayout/AuthLayout";
import { AppLayout } from "../layouts/AppLayout/AppLayout";

import { Login } from "../pages/Login/Login";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Users } from "../pages/Users/Users";
import { UserDetails } from "../pages/UserDetails/UserDetails";
import { Placeholder } from "../pages/Placeholder/Placeholder";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  {
    element: <AuthLayout />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/users", element: <Users /> },
      { path: "/users/:id", element: <UserDetails /> },
      { path: "/section/:name", element: <Placeholder /> },
    ],
  },
]);
