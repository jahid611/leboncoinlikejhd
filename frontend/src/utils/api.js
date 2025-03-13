import axios from "axios"

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api",
})

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stored auth data if token is invalid/expired
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      // Optionally redirect to login page
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default api

