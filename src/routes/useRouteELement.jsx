import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { path } from "../constants/path";
import MainLayout from "../layouts/MainLayout/MainLayout";
import LoginPage from "../pages/LoginPage/LoginPage";
import Homepage from "../pages/Homepage/Homepage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";
import { Admin } from "../pages/Admin/Admin";
import { AdminCustomerManager } from "../pages/AdminCustomerManager/AdminCustomerManager";
import { AdminOrderManager } from "../pages/AdminOrderManager/AdminOrderManager";
import { AdminSizeManager } from "../pages/AdminSizeManager/AdminSizeManager";
import { AdminTypeManager } from "../pages/AdminTypeManager/AdminTypeManager";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

function ProtectedRoutes() {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Outlet></Outlet> : <Navigate to={path.login}></Navigate>;
}

function RejectedRoutes() {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Outlet></Outlet> : <Navigate to={path.homepage}></Navigate>;
}

export default function useRouteElement() {
  const routes = useRoutes([
    {
      path: "/",
      index: true,
      element: (
        <MainLayout>
          <Homepage></Homepage>
        </MainLayout>
      ),
    },
    {
      path: path.login,
      element: <LoginPage></LoginPage>,
    },
    {
      path: path.cart,
      element: (
        <MainLayout>
          <ShoppingCart></ShoppingCart>
        </MainLayout>
      ),
    },
    {
      path: path.register,
      element: <RegisterPage></RegisterPage>,
    },
    {
      path: path.admin,
      element: (
        <MainLayout>
          <Admin>
            <AdminCustomerManager></AdminCustomerManager>
          </Admin>
        </MainLayout>
      ),
    },
    {
      path: path.adminCustomerManager,
      element: (
        <MainLayout>
          <Admin>
            <AdminCustomerManager></AdminCustomerManager>
          </Admin>
        </MainLayout>
      ),
    },
    {
      path: path.adminOrderManager,
      element: (
        <MainLayout>
          <Admin>
            <AdminOrderManager></AdminOrderManager>
          </Admin>
        </MainLayout>
      ),
    },
    {
      path: path.adminTypeManager,
      element: (
        <MainLayout>
          <Admin>
            <AdminTypeManager></AdminTypeManager>
          </Admin>
        </MainLayout>
      ),
    },
    {
      path: path.adminSizeManager,
      element: (
        <MainLayout>
          <Admin>
            <AdminSizeManager></AdminSizeManager>
          </Admin>
        </MainLayout>
      ),
    },
  ]);
  return routes;
}
