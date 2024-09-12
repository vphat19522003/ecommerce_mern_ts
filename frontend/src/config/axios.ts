import axios, { AxiosInstance } from 'axios';

const API_URL =
  import.meta.env.MODE === 'development' ? import.meta.env.VITE_API_LOCAL_URL : import.meta.env.VITE_API_PRODUCT_URL;
const refreshTokenPromise: Promise<any> | null = null;
const axiosCustom: AxiosInstance = axios.create({
  baseURL: API_URL, // URL API
  withCredentials: true, // Send cookies with request
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosCustom.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosCustom.interceptors.response.use(
  (response) => response,
  (error) => {
    debugger;
    const originalRequest = error.config;

    // if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
    //   originalRequest._retry = true;

    //   try {
    //     const response = await axios.post('/auth/refresh-token');
    //     console.log({ response });
    //     return axiosCustom(originalRequest);
    //   } catch (refreshError: any) {
    //     // Xóa cookies nếu refresh token hết hạn
    //     removeCookie('access_token');
    //     removeCookie('refresh_token');
    //     removeCookie('client_id');

    //     toast.warning('Logged out due to unauthoried', {
    //       autoClose: 3000,
    //       onClose: () => {
    //         window.location.href = '/login';
    //       }
    //     });

    //     return Promise.reject(refreshError);
    //   }
    // }

    return Promise.reject(error);
  }
);

export default axiosCustom;
