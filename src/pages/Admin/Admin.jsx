import React from "react";
import "../Admin/Admin.css";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Admin = ({ children }) => {
  return (
    <>
      <div className="admin-main">
        <div className="admin-nav-bar shadow p-3 mb-5 bg-white rounded">
          <div className="admin-nav-bar-button-main">
            <div className="admin-nav-bar-button">
              <Link
                to="/admin/customer-manager"
                type="button"
                className="btn btn-outline-secondary"
              >
                Customer manager
              </Link>
              <Link
                to="/admin/order-manager"
                type="button"
                className="btn btn-outline-secondary"
              >
                Order Manager
              </Link>
              <Link
                to="/admin/type-manager"
                type="button"
                className="btn btn-outline-secondary"
              >
                Type Manager
              </Link>
              <Link
                to="/admin/size-manager"
                type="button"
                className="btn btn-outline-secondary"
              >
                Size Manager
              </Link>
            </div>
          </div>
        </div>
        <div className="admin-content">{children}</div>
      </div>
    </>
  );
};
