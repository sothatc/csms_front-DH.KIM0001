import axios from "axios"
import { getCookie } from "./useCookie";

const axiosInstance = axios.create({
  header: {
    token: '',
  },
  withCredentials: true // 인증쿠키와 header를 같이 보낼지 여부
});

axiosInstance.interceptors.request.use(
  (config) => {
    const access_token = getCookie("access_token");

    if(access_token) {
      config.headers['Authorization'] = `Bearer ${access_token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;