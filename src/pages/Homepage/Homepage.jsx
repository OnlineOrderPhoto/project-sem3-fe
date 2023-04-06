import React, { useState, useEffect } from "react";
import http from "../../utils/http";
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
    return res.data.data.url;
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
    <Form
      onSubmit={handleSubmit}
      noValidate
    >
      {selectedImage && (
        <div>
          <Image
            variant="top"
            alt="not found"
            style={{ width: "18rem" }}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <Button onClick={() => setSelectedImage(null)}>Remove</Button>
        </div>
      )}
      <Form.Group
        controlId="formFile"
        className="mb-3"
      >
        <Form.Label>Your Image</Form.Label>
        <Form.Control
          type="file"
          onChange={(event) => {
            console.log(event.target.files[0].name);
            setSelectedImage(event.target.files[0]);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Size</Form.Label>
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
      <Form.Group>
        <Button
          variant="outline-danger"
          onClick={() => changeQuantity("tru")}
        >
          <i className="bi bi-dash"></i>
        </Button>
        <Button variant="outline-dark">{value.quantity}</Button>
        <Button
          variant="outline-primary"
          onClick={() => changeQuantity("cong")}
        >
          <i className="bi bi-plus"></i>
        </Button>
      </Form.Group>
      <Form.Group>
        <Form.Label>Type</Form.Label>
        {type.map((item) => (
          <div key={item.typeId}>
            <input
              type="radio"
              id={`pickType${item.typeId}`}
              name="TypeName"
              value={item.typeName}
              onChange={(e) => setTypePicker(e.target.value)}
            />
            <label htmlFor={`pickType${item.typeId}`}>{item.typeName}</label>
          </div>
        ))}
      </Form.Group>
      <Form.Group
        as={Row}
        className="mb-3"
        controlId="formPlaintextEmail"
      >
        <Form.Label
          column
          sm="2"
        >
          Total Price
        </Form.Label>
        <Col sm="10">
          <Form.Control
            plaintext
            readOnly
            value={value.total}
          />
        </Col>
      </Form.Group>
      {/* <Button type="submit">Add</Button> */}
      <Button onClick={handleSubmit}>Add</Button>
    </Form>
  );
};
export default Homepage;
