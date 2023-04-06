import React, { useEffect, useState } from "react";
import "../AdminCustomerManager/AdminCustomerManager.css";
import http from "../../utils/http";

export const AdminOrderManager = () => {
  return (
    <>
      <div className="customer-manager-main">
        <div className="cus-son customer-get">
          <div className="cus-son-title customer-get-title">List Order</div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Total Price</th>
                <th scope="col">Email</th>
                <th scope="col">Phone number</th>
                <th scope="col">#</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </>
  );
};
