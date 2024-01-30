import axiosInstance from "../utils/AxiosInstance";
import { showApiErrorToastr } from "../utils/helper";

export async function getAllUsersApi() {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    showApiErrorToastr(error);
    throw error;
  }
}

export async function fetchUsersWithoutMembership() {
  try {
    const response = await axiosInstance.get("/users/non-members");
    return response.data;
  } catch (error) {
    showApiErrorToastr(error);
    throw error;
  }
}
