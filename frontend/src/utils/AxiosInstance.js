import axios from"axios";

const AxiosInstance=axios.create({  
    baseURL:"http://localhost:3001/"
});

AxiosInstance.interceptors.request.use(
    async (config) => {
      const token = await localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default AxiosInstance