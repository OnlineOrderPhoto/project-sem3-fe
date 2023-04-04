import React from "react";
import registerSchema from "../../schemas/registerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import authApi from "../../apis/auth.api";
import Input from "../../components/Input/Input";

const RegisterPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    reValidateMode: "onBlur",
    mode: "onSubmit",
    resolver: yupResolver(registerSchema),
  });
  const loginMutation = useMutation({
    mutationFn: authApi.registerAccount,
  });
  const handleRegister = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        console.log("Đăng ký thành công");
      },
    });
  });
  return (
    <div>
      <form
        onSubmit={handleRegister}
        noValidate
      >
        <Input
          type="text"
          name="fullname"
          register={register}
          inputClassName="register-input"
          containerClassName="register-input-container"
          errorClassName="register-input-error"
          placeholder="Nhập vào họ và tên"
          errorMsg={errors?.fullname?.message}
        ></Input>
        <Input
          type="email"
          name="email"
          register={register}
          inputClassName="register-input"
          containerClassName="register-input-container"
          errorClassName="register-input-error"
          placeholder="Nhập vào địa chỉ e-mail"
          errorMsg={errors?.email?.message}
        ></Input>
        <Input
          type="password"
          name="password"
          register={register}
          inputClassName="register-input"
          containerClassName="register-input-container"
          errorClassName="register-input-error"
          placeholder="Nhập vào mật khẩu"
          errorMsg={errors?.password?.message}
        ></Input>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default RegisterPage;
