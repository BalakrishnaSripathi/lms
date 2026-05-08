import axios from "axios";

const token =
  "";

const axiosInstance =
  axios.create({

    baseURL:
      "http://localhost:9090/api",

    headers: {

      "Content-Type":
        "application/json",

      Authorization:
        `Bearer ${token}`,
    },
});

export default axiosInstance;