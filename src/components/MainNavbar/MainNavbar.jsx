import { Link, useNavigate } from "react-router-dom";
import "./MainNavbar.css";
import React, { useContext } from "react";
import { path } from "../../constants/path";
import { useMutation } from "@tanstack/react-query";
import authApi from "../../apis/auth.api";
import { AuthContext } from "../../contexts/auth.context";

const MainNavbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const logoutMutation = useMutation({
    mutationFn: authApi.logoutAccount,
    onSuccess: () => {
      console.log("Đăng xuất thành công");
    },
  });
  const handleLogoutAccount = () => {
    logoutMutation.mutate();
    setIsAuthenticated(false);
    navigate(path.login);
  };
  return (
    // <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //   <Link
    //     to="/"
    //     className="navbar-brand"
    //   >
    //     PhotoFun
    //   </Link>
    //   <button
    //     className="navbar-toggler"
    //     type="button"
    //     data-toggle="collapse"
    //     data-target="#navbarSupportedContent"
    //     aria-controls="navbarSupportedContent"
    //     aria-expanded="false"
    //     aria-label="Toggle navigation"
    //   >
    //     <span className="navbar-toggler-icon" />
    //   </button>
    //   <div
    //     className="collapse navbar-collapse"
    //     id="navbarSupportedContent"
    //   >
    //     <ul className="navbar-nav mr-auto">
    //       <li className="nav-item active">
    //         <Link
    //           to="/"
    //           className="nav-link"
    //         >
    //           Product
    //         </Link>
    //       </li>
    //       <li>
    //         <Link
    //           to={path.cart}
    //           className="nav-link"
    //         >
    //           Shopping Cart
    //         </Link>
    //       </li>
    //       <li className="login-nav nav-item">
    //         <Link
    //           to={path.login}
    //           className="nav-link"
    //         >
    //           Đăng nhập
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
        >
          PhotoFun
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarScroll"
        >
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/"
              >
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={path.cart}
              >
                Shopping Cart
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            {!isAuthenticated ? (
              <Link
                to={path.login}
                className="btn btn-outline-success"
                type="submit"
              >
                Đăng nhập
              </Link>
            ) : (
              <div
                className="btn btn-outline-success cursor-pointer"
                onClick={handleLogoutAccount}
                aria-hidden
              >
                Đăng xuất
              </div>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
