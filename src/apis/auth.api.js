import http from "../utils/http";

const authApi = {
  registerAccount: ({ fullname, email, password }) => http.post("/Auth/register", { fullname, email, password }),
  loginAccount: (body) => http.post("/Auth/login", body),
  logoutAccount: () => http.post("/Auth/logout"),
};

export default authApi;
