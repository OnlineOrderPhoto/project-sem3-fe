import { useRoutes } from "react-router-dom";
import { path } from "../constants/path";
import MainLayout from "../layouts/MainLayout/MainLayout";
import LoginPage from "../pages/LoginPage/LoginPage";
import Homepage from "../pages/Homepage/Homepage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import { Admin } from "../pages/Admin/Admin";
import { AdminCustomerManager } from "../pages/AdminCustomerManager/AdminCustomerManager";
import { AdminOrderManager } from "../pages/AdminOrderManager/AdminOrderManager";
import { AdminSizeManager } from "../pages/AdminSizeManager/AdminSizeManager";
import { AdminTypeManager } from "../pages/AdminTypeManager/AdminTypeManager";

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
      element: (
        <MainLayout>
          <LoginPage></LoginPage>
        </MainLayout>
      ),
    },
    {
      path: path.register,
      element: (
        <MainLayout>
          <RegisterPage></RegisterPage>
        </MainLayout>
      ),
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
