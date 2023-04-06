import http from "../utils/http";
const sizeApi = {
  sizeImage: () => http.get("/Size/get-size"),
};
export default sizeApi;
