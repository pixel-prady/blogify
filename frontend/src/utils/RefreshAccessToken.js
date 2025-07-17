import axios from "axios";
import store from "../store/store.js";
import { setToken, clearToken } from "../store/slices/appSlice";
import toast from "react-hot-toast";


const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});


const refreshApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = store.getState().app.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            // console.log("Interceptor caught 401, trying refresh");

            originalRequest._retry = true;

            try {
                const { data } = await refreshApi.get("/api/v1/token/refresh");
                // console.log("Refresh response data:", data);

                if (data?.accessToken) {
                    store.dispatch(setToken(data.accessToken));
                    originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                    console.log("Retrying with new access token:", data.accessToken);
                    return api(originalRequest);
                } else {
                    store.dispatch(clearToken());
                    toast.error("Session expired. Please login again.");
                    return Promise.reject(error);
                }
            } catch (refreshError) {
                console.error("Refresh token error:", refreshError);
                store.dispatch(clearToken());
                toast.error("Session expired. Please login again.");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
