import { TBookInputs } from "../@types/book";
import axiosInstance from "../utils/AxiosInstance";
import { showApiErrorToastr } from "../utils/helper";

export async function addNewBook(data: TBookInputs) {
  console.log(data);

  try {
    console.log(data);
    const response = await axiosInstance.post("/books", data);
    return response.data;
  } catch (error) {
    console.log(error);
    showApiErrorToastr(error);
    throw error;
  }
}

export async function updateBook(id: number, data: TBookInputs) {
  try {
    const response = await axiosInstance.put(`/books/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteBook(id: number) {
  try {
    const response = await axiosInstance.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
