import { useMutation } from "@tanstack/react-query";
import React from "react";
import authApi from "../../apis/auth.api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input/Input";
import loginSchema from "../../schemas/loginSchema";

const LoginPage = () => {
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
        console.log("Đăng nhập thành công");
      },
    });
  });
  return (
    <div>
      <form
        onSubmit={handleLogin}
        noValidate
      >
        <Input
          type="email"
          name="email"
          register={register}
          inputClassName="login-input"
          containerClassName="login-input-container"
          errorClassName="login-input-error"
          placeholder="Nhập vào địa chỉ e-mail"
          errorMsg={errors?.email?.message}
        ></Input>
        <Input
          type="password"
          name="password"
          register={register}
          inputClassName="login-input"
          containerClassName="login-input-container"
          errorClassName="login-input-error"
          placeholder="Nhập vào mật khẩu"
          errorMsg={errors?.password?.message}
        ></Input>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default LoginPage;
