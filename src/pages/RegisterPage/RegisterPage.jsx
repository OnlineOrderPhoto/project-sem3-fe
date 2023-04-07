import React, { useState } from "react";
import registerSchema from "../../schemas/registerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import authApi from "../../apis/auth.api";
import Input from "../../components/Input/Input";
import "./Register.scss";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { path } from "../../constants/path";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    reValidateMode: "onBlur",
    mode: "onSubmit",
    resolver: yupResolver(registerSchema),
  });
  const handleToLogin = () => {
    navigate(path.login);
  };
  const loginMutation = useMutation({
    mutationFn: authApi.registerAccount,
  });
  const handleRegister = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: () => handleShow(),
      // console.log("Đăng ký thành công");
    });
  });
  return (
    <div className="root-container">
      <Modal
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Register success</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleToLogin}
          >
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>
      <form
        onSubmit={handleRegister}
        noValidate
        className="form-login"
      >
        <h2 className="login-title">Register</h2>
        <Form.Group className="item-input">
          <Form.Label className="form-label">Full Name</Form.Label>
          <Input
            type="text"
            name="fullname"
            register={register}
            inputClassName="register-input login-input"
            containerClassName="register-input-container login-input-container"
            errorClassName="register-input-error login-input-error"
            placeholder="Nhập vào họ và tên"
            errorMsg={errors?.fullname?.message}
          ></Input>
        </Form.Group>
        <Form.Group className="item-input">
          <Form.Label className="form-label">Email</Form.Label>
          <Input
            type="email"
            name="email"
            register={register}
            inputClassName="register-input login-input"
            containerClassName="register-input-container login-input-container"
            errorClassName="register-input-error login-input-error"
            placeholder="Nhập vào địa chỉ e-mail"
            errorMsg={errors?.email?.message}
          ></Input>
        </Form.Group>
        <Form.Group className="item-input">
          <Form.Label className="form-label">Password</Form.Label>
          <Input
            type="password"
            name="password"
            register={register}
            inputClassName="register-input login-input"
            containerClassName="register-input-container login-input-container"
            errorClassName="register-input-error login-input-error"
            placeholder="Nhập vào mật khẩu"
            errorMsg={errors?.password?.message}
          ></Input>
        </Form.Group>
        <Form.Group className="btn-login">
          <Button
            size="lg"
            type="submit"
          >
            Sign Up
          </Button>
        </Form.Group>
      </form>
    </div>
  );
};

export default RegisterPage;
