import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_REACT_BACKEND_URL || "http://localhost:3000/api",
});

export default api;
