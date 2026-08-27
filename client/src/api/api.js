import axios from "axios";

const api = axios.create({
  baseURL: "https://women-safety-emergency-platform.onrender.com/api",
});

export default api;