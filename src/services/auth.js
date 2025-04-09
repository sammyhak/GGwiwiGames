import api from "./api";

export const registerUser = async (userData) => {
  const response = await api.post("/auths/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/auths/login", credentials);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get("/auths");
  return response.data;
};
