import React, { useEffect, useState } from "react";
import http from "../../utils/http";
import "./ShoppingCart.scss";
import Button from "react-bootstrap/Button";
const ShoppingCart = () => {
  const [orderDetails, setOrderDetail] = useState([]);
  // const [payItem, setPayItem] = useState([]);
  const [selectInputId, setSetlectInputId] = useState([]);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [showForm, setShowForm] = useState(false);
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

    let check = true;

    if (check) {
      setShowForm(true);
    }
  }

  const handleOk = async () => {
    const res = await http.post("ShoppingCards/Pay", {
      phone: phone,
      email: email,
      address: address,
      cardNumber: cardNumber,
    });
    if (res.data && res.data === "Thanh toan thanh cong") {
      alert(res.data);
      window.location.href = "/";
    } else {
      alert(res.data);
    }
  };
  return (
    <div className="container-table">
      <table className="table ">
        <thead>
          <tr>
            {/* <td>Image</td> */}
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
            <tr
              className="item-shopping-cart"
              key={index}
            >
              {/* <td>
                <img
                  src="https://localhost:7107/images/" + {orderDetail.pictureName}
                  alt=""
                />
              </td> */}
              <td>{orderDetail.pictureName}</td>
              <td>{orderDetail.size}</td>
              <td>{orderDetail.type}</td>
              <td>{orderDetail.quantity}</td>
              <td>{orderDetail.price}</td>
            </tr>
          ))}
        </tbody>
        <Button
          className="btn-submit"
          onClick={handleSubmit}
        >
          Thanh toán
        </Button>
      </table>
      {showForm && (
        <form className="text-center mt-xx form">
          <div className="form-group">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone"
              type="number"
              name="phone"
              required
              className="form-control"
            />
          </div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            type="email"
            name="email"
            required
            className="form-control"
          />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Your Address"
            type="text"
            name="address"
            required
            className="form-control"
          />
          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Your Card Number"
            type="number"
            name="cardNumber"
            required
            className="form-control"
          />
          <Button
            className="btn btn-submit"
            onClick={handleOk}
          >
            Xác Nhận
          </Button>
        </form>
      )}
    </div>
  );
};
export default ShoppingCart;
