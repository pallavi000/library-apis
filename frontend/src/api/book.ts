import { TBookInputs } from "../@types/book";
import axiosInstance from "../utils/AxiosInstance";
import { showApiErrorToastr, showCustomToastr } from "../utils/helper";

export async function addNewBook(data: TBookInputs) {
  try {
    const response = await axiosInstance.post("/books", data);
    showCustomToastr("Book created successfully", "success");
    return response.data;
  } catch (error) {
    showApiErrorToastr(error);
    throw error;
  }
}

export async function reserveBook(bookId: number) {
  try {
    const response = await axiosInstance.post(`/books/reserve/${bookId}`);
    showCustomToastr("Book reserved successfully", "success");
    return response.data;
  } catch (error) {
    showApiErrorToastr(error);
    throw error;
  }
}

export async function updateBook(id: number, data: TBookInputs) {
  try {
    const response = await axiosInstance.put(`/books/${id}`, data);
    showCustomToastr("Book updated successfully", "success");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteBook(id: number) {
  try {
    const response = await axiosInstance.delete(`/books/${id}`);
    showCustomToastr("Book deleted successfully", "success");
    return response.data;
  } catch (error) {
    throw error;
  }
}
