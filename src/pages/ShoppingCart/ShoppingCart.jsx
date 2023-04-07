import React, { useEffect, useState } from "react";
import http from "../../utils/http";
import "./ShoppingCart.scss";
import { Button } from "react-bootstrap";
const ShoppingCart = () => {
  const [orderDetails, setOrderDetail] = useState([]);
  // const [payItem, setPayItem] = useState([]);
  const [selectInputId, setSetlectInputId] = useState([]);
  useEffect(() => {
    const getOrderDetail = async () => {
      const res = await http.get("/ShoppingCards");
      setOrderDetail(res.data);
    };
    getOrderDetail();
  }, []);
  const handleInputChange = (e) => {
    setSetlectInputId(selectInputId.some((a) => a == e) ? selectInputId.filter((a) => a != e) : [...selectInputId, e]);
  };
  function handleSubmit(e) {
    e.preventDefault();
    var data = [];
    selectInputId.forEach((a) => data.push(orderDetails[a]));

    console.log(data);
  }
  return (
    <div>
      <table className="table container-table">
        <thead>
          <tr>
            <td>Picture Name</td>
            <td>Size</td>
            <td>Type</td>
            <td>quantity</td>
            <td>price</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((orderDetail, index) => (
            <tr key={index}>
              <td>{orderDetail.pictureName}</td>
              <td>{orderDetail.size}</td>
              <td>{orderDetail.type}</td>
              <td>{orderDetail.quantity}</td>
              <td>{orderDetail.price}</td>
              <input
                type="checkbox"
                id={index}
                name="pick"
                checked={selectInputId.some((a) => a == index)}
                onChange={(e) => handleInputChange(index)}
              />
            </tr>
          ))}
        </tbody>
        <br />
        <Button onClick={handleSubmit}>submit</Button>
      </table>
    </div>
  );
};
export default ShoppingCart;
