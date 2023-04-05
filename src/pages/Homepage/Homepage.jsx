import React from "react";
import Input from "../../components/Input/Input";
import { useState, useEffect } from "react";
import http from "../../utils/http";
import { Form, Button } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const Homepage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [nameImage, setNameImage] = useState(null);
  const [data, setData] = useState([])
  const [price, setPrice] = useState(0)
  const [quantity,setQuantity]= useState(0)
  useEffect(() => {
    const getData = async () => {
      const res = await http.get("/Size/get-size")
      setData(res.data)
    }

    getData();
    console.log(data)
  }, [])
  return <div>
    {selectedImage && (
      <div>
        <img
          alt="not found"
          width={"250px"}
          src={URL.createObjectURL(selectedImage)}
        />
        <br />
        <Button onClick={() => setSelectedImage(null)}>Remove</Button>
      </div>
    )}
    <Form.Group controlId="formFile" className="mb-3">
      <Form.Label>Your Image</Form.Label>
      <Form.Control type="file" onChange={(event) => {
        console.log(event.target.files[0].name);
        setSelectedImage(event.target.files[0]);
        setNameImage(event.target.files[0].name)
      }} />
    </Form.Group>
    <Form.Group>
      <Form.Label>Size</Form.Label>
      <Form.Select onChange={e => {
        console.log(e.target.value)
        setPrice(e.target.value)
      }} defaultValue={price}>
        <option value={0}>Pic Size Image</option>
        {data.map(item =>
          <option key={item.sizeId} value={item.sizePrice}>{item.picSize}</option>
        )}
      </Form.Select>
    </Form.Group>
    <Form.Group>
      <Button variant="outline-dark">BiPlusMedical</Button>
      <Button variant="outline-dark">{quantity}</Button>
      <Button variant="outline-dark">Dark</Button>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
      <Form.Label column sm="2">
        Total Price
      </Form.Label>
      <Col sm="10">
        <Form.Control plaintext readOnly value={price} />
      </Col>
    </Form.Group>
  </div>;
};


export default Homepage;
