import { Link, useNavigate } from "react-router-dom";
import "./MainNavbar.scss";
import React from "react";
import { path } from "../../constants/path";
import { useMutation } from "@tanstack/react-query";
import authApi from "../../apis/auth.api";

const MainNavbar = () => {
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: authApi.logoutAccount,
    onSuccess: () => {
      console.log("Đăng xuất thành công");
    },
  });
  const handleLogoutAccount = () => {
    logoutMutation.mutate();
    navigate(path.login);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link
        to="/"
        className="navbar-brand"
      >
        PhotoFun
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className="collapse navbar-collapse"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link
              to="/"
              className="nav-link"
            >
              Product
            </Link>
          </li>
          <li>
            <Link
              to={path.cart}
              className="nav-link"
            >
              Shopping Cart
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={path.login}
              className="nav-link"
            >
              Đăng nhập
            </Link>
          </li>
          <li className="nav-item">
            <div
              onClick={handleLogoutAccount}
              aria-hidden
              className="nav-link"
            >
              Đăng xuất
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainNavbar;
