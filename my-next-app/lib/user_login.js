import instance from "./axios";

const BASE_URL = "http://localhost:3000";

export const user_login = async (formData) => {
  const response = await instance.post(`/users/login`,formData);
  return response.data;
}