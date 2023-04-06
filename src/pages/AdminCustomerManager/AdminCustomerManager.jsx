import React, { useEffect, useState } from "react";
import "../AdminCustomerManager/AdminCustomerManager.css";
import http from "../../utils/http";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

export const AdminCustomerManager = () => {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async ({ id }) => {
    setShow(true);
    setUserId(id);
    const res = await http.get("/User?userId=" + id);
    setFullname(res.data.data.name);
    setEmail(res.data.data.email);
    setPhoneNumber(res.data.data.phoneNumber);
    setGender(res.data.data.gender);
  };

  const handleUpdateUserData = async () => {
    if (fullname !== "" || gender !== "" || email !== "" || phoneNumber !== "") {
      const res = await http.put("/User/update?userId=" + userId, {
        name: fullname,
        gender: gender,
        email: email,
        phoneNumber: phoneNumber,
      });
      console.log(res);
      setShow(false);
      location.reload();
    } else {
      alert("Vui lòng điền đầy đủ thông tin");
    }
  };

  useEffect(() => {
    const getData = async () => {
      const res = await http.get("/User/all");
      setData(res.data.data);
    };

    getData();
  }, []);

  return (
    <>
      <div className="customer-manager-main">
        <div className="cus-son customer-get">
          <div className="cus-son-title customer-get-title">List Customer</div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">UUID</th>
                <th scope="col">Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Email</th>
                <th scope="col">Phone number</th>
                <th scope="col">#</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <th>{item.id}</th>
                  <th>{item.fulllname}</th>
                  <th>{item.gender == 0 ? <p>Female</p> : <p>Male</p>}</th>
                  <th>{item.email}</th>
                  <th>{item.phoneNumber}</th>
                  <th>
                    <Link
                      variant="primary"
                      onClick={() => handleShow(item)}
                    >
                      <i className="bi bi-pencil"></i>
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update customer data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
              >
                <Form.Label>Fullname</Form.Label>
                <Form.Control
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="Enter fullname"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
              >
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="number"
                  placeholder="Enter Phone number"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
              >
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option defaultValue>Gender</option>
                  <option value="0">Female</option>
                  <option value="1">Male</option>
                </select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => handleUpdateUserData()}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="cus-son customer-delete"></div>
      </div>
    </>
  );
};
