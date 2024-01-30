import { TGenreInputs } from "../@types/genre";
import axiosInstance from "../utils/AxiosInstance";
import { showApiErrorToastr } from "../utils/helper";

export async function addNewGenre(data: TGenreInputs) {
  try {
    const response = await axiosInstance.post("/genra", data);
    return response.data;
  } catch (error) {
    showApiErrorToastr(error);
    throw error;
  }
}

export async function fetchGenreById(id: number) {
  try {
    const response = await axiosInstance.get(`/genra/${id}`);
    return response.data;
  } catch (error) {
    throw showApiErrorToastr(error);
  }
}

export async function updateGenre(id: number, data: TGenreInputs) {
  try {
    const response = await axiosInstance.put(`/genra/${id}`, data);
    return response;
  } catch (error) {
    throw showApiErrorToastr(error);
  }
}

export async function deleteGenre(id: number) {
  try {
    const response = await axiosInstance.delete(`/genra/${id}`);
    return response;
  } catch (error) {
    throw showApiErrorToastr(error);
  }
}
