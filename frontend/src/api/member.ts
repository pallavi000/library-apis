import { TMemberInputs } from "../@types/user";
import axiosInstance from "../utils/AxiosInstance";
import { showApiErrorToastr } from "../utils/helper";

export async function fetchAllMemberships() {
  try {
    const response = await axiosInstance.get("/members");
    return response.data;
  } catch (error) {
    showApiErrorToastr(error);
    throw error;
  }
}

export async function fetchAllInactiveMemberships() {
  try {
    const response = await axiosInstance.get("/members/inactive");
    return response.data;
  } catch (error) {
    showApiErrorToastr(error);
    throw error;
  }
}

export async function addNewMemberShip(data: TMemberInputs) {
  try {
    const response = await axiosInstance.post("/members", data);
    return response.data;
  } catch (error) {
    showApiErrorToastr(error);
    throw error;
  }
}

export async function updateMembership(id: number, data: TMemberInputs) {
  try {
    const response = await axiosInstance.put(`/members/${id}`, data);
    return response.data;
  } catch (error) {
    showApiErrorToastr(error);
    throw error;
  }
}

export async function deleteMembership(id: number) {
  try {
    const response = await axiosInstance.delete(`/members/${id}`);
    return response.data;
  } catch (error) {
    showApiErrorToastr(error);
    throw error;
  }
}
