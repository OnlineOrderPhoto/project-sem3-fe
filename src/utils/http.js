import axios from "axios";
import { clearAuthenInfoFromLS, getAccessTokenFromLS, saveAccessTokenToLS, saveProfileToLS } from "./auth";
import { httpStatusCode } from "../constants/httpStatusCode";
import jwtDecode from "jwt-decode";

class Http {
  constructor() {
    this.accessToken = getAccessTokenFromLS() || "";
    this.instance = axios.create({
      baseURL: "https://localhost:7107/api",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === "/Auth/login" || url === "/Auth/register") {
          this.accessToken = response.data.data.accessToken;
          this.userProfile = response.data.data.userDto;
          const token = this.accessToken;
          const decoded = jwtDecode(token);
          saveAccessTokenToLS(this.accessToken);
          saveProfileToLS({ ...this.userProfile, role: decoded.role });
        } else if (url === "/Auth/logout") {
          this.accessToken = "";
          clearAuthenInfoFromLS();
        }
        return response;
      },
      (error) => {
        if (error?.response?.status === httpStatusCode.Unauthorized) {
          return Promise.reject(error);
        }
        if (error?.response?.status !== httpStatusCode.UnprocessableEntity) {
          // const message = error.message;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data = error.response?.data;
          const message = data.errorMessages || error.message;
          return Promise.reject(error);
        }

        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;

export default http;
