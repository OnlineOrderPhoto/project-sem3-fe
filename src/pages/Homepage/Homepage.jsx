import React, { useState, useEffect } from "react";
import http from "../../utils/http";
import "./HomePage.scss";
import { Form, Button, Image } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Homepage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState([]);
  const [type, setType] = useState([]);
  const [typePicker, setTypePicker] = useState("");
  const [value, setValue] = useState({
    price: 0,
    size: "",
    quantity: 1,
    total: 0,
  });
  const handleSubmit = async () => {
    const sizeAndTypes = {
      size: value.size,
      // price: value.total,
      type: typePicker,
      quantity: value.quantity,
    };
    // console.log(sizeAndTypes);
    const bodyFormData = new FormData();
    bodyFormData.append("PictureName", selectedImage);
    bodyFormData.append("sizeAndType.Size", sizeAndTypes.size);
    bodyFormData.append("sizeAndType.Type", sizeAndTypes.type);
    bodyFormData.append("sizeAndType.Quantity", sizeAndTypes.quantity);
    const res = await http.post("/OrderDetails", bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const dataRes = res.data;
    console.log(dataRes);
    return dataRes;
  };
  const changeQuantity = (type) => {
    if (type != "cong" && value.quantity == 1) return;
    changeValue("quantity", type == "cong" ? value.quantity + 1 : value.quantity - 1);
  };
  const changeValue = (k, v) => {
    var obj = {};
    if (typeof k == "string") {
      obj = {
        ...value,
        [k]: v,
      };
    } else {
      obj = {
        ...value,
        ...k,
      };
    }
    obj.total = (obj.price * obj.quantity).toFixed(2) * 1;
    setValue(obj);
  };

  useEffect(() => {
    const getSize = async () => {
      const res = await http.get("/Size/get-size");
      setData(res.data);
    };
    const getType = async () => {
      const res = await http.get("/Type/get-type");
      setType(res.data);
    };

    getSize();
    getType();

    console.log(type);
  }, []);
  return (
    <div className="root-container">
      <Form
        className="form-root"
        // onSubmit={handleSubmit}
        noValidate
      >
        <div className="image-container">
          <Form.Group
            controlId="formFile"
            className="mb-3"
          >
            <Form.Label className="text">Your Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(event) => {
                console.log(event.target.files[0].name);
                setSelectedImage(event.target.files[0]);
              }}
            />
          </Form.Group>
          {selectedImage && (
            <div>
              <Image
                variant="top"
                alt="not found"
                style={{ width: "18rem", border: "1px solid black", boxShadow: "0px 5px 10px 0px" }}
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
              <Button onClick={() => setSelectedImage(null)}>Remove</Button>
            </div>
          )}
        </div>
        <div className="pickup-container">
          <Form.Group className="item">
            <Form.Label className="text">Size</Form.Label>
            <Form.Select
              onChange={(e) => {
                changeValue({
                  price: e.target.value * 1,
                  size: e.target.options[e.target.selectedIndex].dataset.size,
                });
              }}
              defaultValue={value.price}
            >
              <option value={0}>Pic Size Image</option>
              {data.map((item) => (
                <option
                  key={item.sizeId}
                  value={item.sizePrice}
                  data-size={item.picSize}
                >
                  {item.picSize}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="item">
            <Form.Label className="text">Quantity </Form.Label>
            <Button
              variant="outline-danger"
              onClick={() => changeQuantity("tru")}
            >
              <i className="bi bi-dash icon"></i>
            </Button>
            <div className="quantity-value">{value.quantity}</div>
            <Button
              variant="outline-primary"
              onClick={() => changeQuantity("cong")}
            >
              <i className="bi bi-plus icon"></i>
            </Button>
          </Form.Group>
          <Form.Group className="item">
            <Form.Label className="text">Type</Form.Label>
            {type.map((item) => (
              <div
                key={item.typeId}
                className="quantity-value"
              >
                <input
                  type="radio"
                  id={`pickType${item.typeId}`}
                  name="TypeName"
                  value={item.typeName}
                  onChange={(e) => setTypePicker(e.target.value)}
                />
                <label
                  htmlFor={`pickType${item.typeId}`}
                  className="quantity-value text-label"
                >
                  {item.typeName}
                </label>
              </div>
            ))}
          </Form.Group>
          <Form.Group className="form-label text form-total">
            <Form.Label className=" total-price">Total Price</Form.Label>
            <Form.Control
              plaintext
              readOnly
              value={value.total}
            />
          </Form.Group>
          <Button onClick={handleSubmit}>Add to Shopping Cart</Button>
        </div>
        {/* <Button type="submit">Add</Button> */}
      </Form>
    </div>
  );
};
export default Homepage;
