import api from "./api";

export const fetchUserTransation = async () => {
  const response = await api.get(`/transactions/user`);
  return response.data;
};
