import api from "./api";

export const fetchUserBalance = async () => {
  const response = await api.get(`/wallets/balance`);
  return response.data;
};

export const fundWallet = async (amount) => {
  const response = await api.post(`/wallets/fund`, {
    amount,
  });
  return response.data;
};

export const createWithdrawalRequest = async (metaData) => {
  const response = await api.post(`/wallets/withdraw`, {
    ...metaData,
  });
  return response.data;
};
