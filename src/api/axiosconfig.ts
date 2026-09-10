


import axios from "axios";
import type {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

interface CustomAxiosRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3012";

console.log("📡 API Base URL:", API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },

  withCredentials: true,
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method?.toUpperCase()} ${config.baseURL}${config.url}`
    );
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      console.log("📦 FormData request detected");

      for (const [key, value] of config.data.entries()) {
        console.log("FORM DATA:", key, value);
      }
      if (config.headers) {
        delete config.headers["Content-Type"];
      }
    } else if (config.data) {
      console.log("📤 Request Data:", config.data);
    }

    return config;
  },

  (error) => {
    console.error(" Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(
      `${response.config.url} - Status: ${response.status}`
    );

    return response;
  },

  async (error: AxiosError) => {
    console.error(" Response Error:", {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });

    const originalRequest =
      error.config as CustomAxiosRequestConfig;
    if (
      error.response?.status !== 401 ||
      originalRequest?._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const token = Cookies.get("token");

    if (!token) {
      console.log(
        "🔐 No token found, redirecting to login"
      );

      Cookies.remove("token");

      window.location.href = "/login";

      return Promise.reject(error);
    }

    try {
      console.log("🔄 Refreshing token...");

      const response = await axios.post(
        `${API_URL}/api/token`,
        { token },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const newtoken = response.data.token;

      if (!newtoken) {
        throw new Error(
          "New token was not returned by server"
        );
      }
      Cookies.set("token", newtoken);

      console.log("✅ Token successfully refreshed");
      if (originalRequest.headers) {
        originalRequest.headers.Authorization =
          `Bearer ${newtoken}`;
      }
      return api(originalRequest);
    } catch (refreshError) {
      console.error(
        " Token refresh failed:",
        refreshError
      );

      Cookies.remove("token");

      window.location.href = "/login";

      return Promise.reject(refreshError);
    }
  }
);

export default api;

