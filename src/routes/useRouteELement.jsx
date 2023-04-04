import { useRoutes } from "react-router-dom";
import { path } from "../constants/path";
import MainLayout from "../layouts/MainLayout/MainLayout";
import LoginPage from "../pages/LoginPage/LoginPage";
import Homepage from "../pages/Homepage/Homepage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

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
  ]);
  return routes;
}
