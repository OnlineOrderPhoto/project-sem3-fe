import React, { useEffect, useState } from "react";
import http from "../../utils/http";

const ShoppingCart = () => {
  const [orderDetails, setOrderDetail] = useState([]);
  useEffect(() => {
    const getOrderDetail = async () => {
      const res = await http.get("/OrderDetails");
      setOrderDetail(res.data);
    };
    getOrderDetail();
  }, []);
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <td>ID</td>
            <td>Picture Name</td>
            <td>sizeId</td>
            <td>typeId</td>
            <td>quantity</td>
            <td>price</td>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((orderDetail) => (
            <tr key={orderDetail.orderDetailId}>
              <td>{orderDetail.orderDetailId}</td>
              <td>{orderDetail.pictureName}</td>
              <td>{orderDetail.sizeId}</td>
              <td>{orderDetail.typeId}</td>
              <td>{orderDetail.quantity}</td>
              <td>{orderDetail.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ShoppingCart;
