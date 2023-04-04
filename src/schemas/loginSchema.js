import * as yup from "yup";
const loginSchema = yup.object({
  //   fullname: yup.string().required("Vui lòng nhập vào họ và tên").min(3, "Họ và tên cần phải dài hơn 3 ký tự"),
  email: yup.string().email("Email không đúng định dạng").required("Vui lòng nhập vào địa chỉ e-mail"),
  password: yup.string().required("Vui lòng nhập vào mật khẩu"),
});

export default loginSchema;
