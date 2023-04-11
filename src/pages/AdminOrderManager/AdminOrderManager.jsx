import React, { useEffect, useState } from "react";
import "../AdminCustomerManager/AdminCustomerManager.css";
import http from "../../utils/http";

export const AdminOrderManager = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await http.get("/OrderDetails");
      setData(res.data);
    };

    getData();
  }, []);

  return (
    <>
      <div className="customer-manager-main">
        <div className="cus-son customer-get">
          <div className="cus-son-title customer-get-title">List Order</div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Picture Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Size</th>
                <th scope="col">Type</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.orderDetailId}>
                  <th>{item.orderDetailId}</th>
                  <th>{item.pictureName}</th>
                  <th>{item.quantity}</th>
                  <th>{item.sizeId}</th>
                  <th>{item.typeId}</th>
                  <th>{item.price}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
