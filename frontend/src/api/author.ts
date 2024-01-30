import { TAuthorInputs } from "../@types/author";
import axiosInstance from "../utils/AxiosInstance";
import { showApiErrorToastr } from "../utils/helper";

export async function addNewAuthor(data: TAuthorInputs) {
  try {
    const response = await axiosInstance.post("/authors", data);
    return response.data;
  } catch (error) {
    showApiErrorToastr(error);
    throw error;
  }
}

export async function fetchAuthorById(id: number) {
  try {
    const response = await axiosInstance.get(`/authors/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateAuthor(id: number, data: TAuthorInputs) {
  try {
    const response = await axiosInstance.put(`/authors/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteAuthor(id: number) {
  try {
    const response = await axiosInstance.delete(`/authors/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
