import instance from "./axios";

export const user_register = async (formData) => {
    console.log("data",formData);
    
  const response = await instance.post(`/users/register`,formData);
  return response.data;
}