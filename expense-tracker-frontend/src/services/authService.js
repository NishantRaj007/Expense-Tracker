import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AUTH_API = "http://localhost:8080/auth";

/* ================= LOGIN ================= */
export const login = async (credentials) => {
  const response = await axios.post(`${AUTH_API}/login`, credentials);

  const token = response.data.token;

  // Store token
  localStorage.setItem("token", token);

  // Decode token to get username
  const decoded = jwtDecode(token);
  localStorage.setItem("username", decoded.sub);

  return response.data;
};

/* ================= REGISTER ================= */
export const register = (user) =>
  axios.post(`${AUTH_API}/register`, user);

/* ================= LOGOUT ================= */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};

/* ================= HELPERS ================= */
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUsername = () => {
  return localStorage.getItem("username");
};
