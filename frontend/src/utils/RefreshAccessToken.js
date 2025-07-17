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

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/login") &&
            !originalRequest.url.includes("/register")
        ) {
            originalRequest._retry = true;
            try {
                const { data } = await refreshApi.get("/api/v1/token/refresh");
                if (data?.accessToken) {
                    store.dispatch(setToken(data.accessToken));
                    originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                    return api(originalRequest);
                } else {
                    store.dispatch(clearToken());
                    toast.error("Session expired. Please login again.");
                    return Promise.reject(error);
                }
            } catch (refreshError) {
                store.dispatch(clearToken());
                toast.error("Session expired. Please login again.");
                return Promise.reject(refreshError);
            }
        }

        if (!error.response) {
            toast.error("Network error. Please check your connection.");
        }

        return Promise.reject(error);
    }
);


export default api;
