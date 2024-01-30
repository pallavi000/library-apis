import { LoginInputs, RegisterInputs } from "../@types/user";
import axiosInstance from "../utils/AxiosInstance";
import { showApiErrorToastr } from "../utils/helper";

export async function loginApi(data: LoginInputs) {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error) {
    showApiErrorToastr(error);
    throw error;
  }
}

export async function registerApi(data: RegisterInputs) {
  try {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  } catch (error) {
    showApiErrorToastr(error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const response = await axiosInstance.get("/auth/profile");
    return response.data;
  } catch (error) {
    showApiErrorToastr(error);
    throw error;
  }
}
