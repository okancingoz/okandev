import { API_URL } from "@/config/env";
import axios from "axios";

const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000,
});

export default http;
