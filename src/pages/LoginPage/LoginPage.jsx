import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import authApi from "../../apis/auth.api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input/Input";
import loginSchema from "../../schemas/loginSchema";
import { useNavigate } from "react-router-dom";
import { path } from "../../constants/path";
import { AuthContext } from "../../contexts/auth.context";
import "./LoginPage.scss";
import { Button, Form } from "react-bootstrap";
const LoginPage = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    reValidateMode: "onBlur",
    mode: "onSubmit",
    resolver: yupResolver(loginSchema),
  });
  const loginMutation = useMutation({
    mutationFn: authApi.loginAccount,
  });
  const handleLogin = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate(path.homepage);
        setIsAuthenticated(true);
        console.log("Đăng nhập thành công");
      },
    });
  });
  return (
    <div className="root-container">
      <form
        onSubmit={handleLogin}
        noValidate
        className="form-login"
      >
        <h2 className="login-title">Login</h2>
        <Form.Group className="item-input">
          <Form.Label className="form-label">Email</Form.Label>
          <Input
            type="email"
            name="email"
            register={register}
            inputClassName="login-input"
            containerClassName="login-input-container"
            errorClassName="login-input-error"
            placeholder="Enter your email"
            errorMsg={errors?.email?.message}
          ></Input>
        </Form.Group>
        <Form.Group className="item-input">
          <Form.Label className="form-label">Password</Form.Label>
          <Input
            type="password"
            name="password"
            register={register}
            inputClassName="login-input"
            containerClassName="login-input-container"
            errorClassName="login-input-error"
            placeholder="Enter you password"
            errorMsg={errors?.password?.message}
          ></Input>
        </Form.Group>
        <Form.Group className="form-link-register">
          <Form.Label> Do you not have an account? </Form.Label>
          <Button
            className="btn-link-register"
            variant="outline-info"
            onClick={() => navigate(path.register)}
          >
            Register
          </Button>
        </Form.Group>
        <Form.Group className="btn-login">
          <Button
            type="submit"
            size="lg"
          >
            Đăng nhập
          </Button>
        </Form.Group>
      </form>
    </div>
  );
};

export default LoginPage;
