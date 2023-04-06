import React, { useEffect, useState } from "react";
import http from "../../utils/http";
import { Link } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import "../AdminSizeManager/AdminSizeManager.css";

export const AdminTypeManager = () => {
  const [createName, setCreateName] = useState("");
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);

  const handleDeletePopUpClose = () => setDeletePopUp(false);
  const handleDeletePopUpShow = (id) => {
    setDeletePopUp(true);
    setId(id);
  };

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setId(id);
  };

  const handleUpdateUserData = async () => {
    if (name === "") {
      alert("Vui lòng điền đầy đủ thông tin !");
    }

    if (name !== "") {
      try {
        const res = await http.put("Type/put-type/" + id, {
          typeName: name,
        });
        console.log(res);
        setShow(false);
        location.reload();
      } catch {
        alert("Đã có dữ liệu trong DB");
      }
    }
  };

  const handleDeleteSize = async () => {
    console.log(id);
    const res = await http.delete("Type/delete-type/" + id);
    console.log(res);
    setDeletePopUp(false);
    location.reload();
  };

  const handleCreateNewSize = async () => {
    try {
      if (createName === "") {
        alert("Vui lòng nhập đầy đủ thông tin !!");
      } else {
        const res = await http.post("Type/post-type", {
          typeName: createName,
        });

        console.log(res);
        location.reload();
      }
    } catch {
      alert("Đã có dữ liệu trong DB");
    }
  };

  useEffect(() => {
    const getData = async () => {
      const res = await http.get("Type/get-type");
      setData(res.data);
    };

    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="customer-manager-main">
        <div className="cus-son customer-get">
          <div className="cus-son-title customer-get-title">Type Manager</div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Type Name</th>
                <th scope="col">#</th>
                <th scope="col">#</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.typeId}>
                  <th>{item.typeId}</th>
                  <th>{item.typeName}</th>
                  <th>
                    <Link onClick={() => handleDeletePopUpShow(item.typeId)}>
                      <i className="bi bi-trash3"></i>
                    </Link>
                  </th>
                  <th>
                    <Link
                      variant="primary"
                      onClick={() => handleShow(item.typeId)}
                    >
                      <i className="bi bi-pencil"></i>
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="cus-son customer-post">
          <div className="cus-son-title customer-get-title">Create New Type</div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
              >
                Name of Size
              </label>
              <input
                onChange={(e) => setCreateName(e.target.value)}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Type name"
              />
              <div
                id="emailHelp"
                className="form-text"
              ></div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleCreateNewSize}
            >
              Submit
            </button>
          </form>
        </div>

        <Modal
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Type Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Type name"
                />
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
              onClick={handleUpdateUserData}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* DELETE POPUP */}

        <Modal
          show={deletePopUp}
          onHide={handleDeletePopUpClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Are you sure ?</Modal.Title>
          </Modal.Header>
          <Modal.Body className="delete-form-popup">
            <Button
              variant="secondary"
              onClick={handleDeletePopUpClose}
            >
              Close
            </Button>
            <Button
              className="delete-btn"
              variant="primary"
              onClick={handleDeleteSize}
            >
              Delete
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
