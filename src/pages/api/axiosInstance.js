import axios from "axios"

const axiosInstance = axios.create({
  header: {
    token: '',
  },
  withCredentials: true // 인증쿠키와 header를 같이 보낼지 여부
});

axiosInstance.interceptors.request.use(
  (config) => {
    // config.headers['token']
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