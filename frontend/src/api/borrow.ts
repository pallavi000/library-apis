import { TBorrowInputs } from "../@types/borrow";
import axiosInstance from "../utils/AxiosInstance";
import { showApiErrorToastr, showCustomToastr } from "../utils/helper";

export async function fetchAllBorrows() {
  try {
    const response = await axiosInstance.get("/borrows");
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function issueBorrowBook(data: TBorrowInputs) {
  try {
    const response = await axiosInstance.post(`/borrows`, data);
    showCustomToastr("Book issued successfull.", "success");
    return response.data;
  } catch (error) {
    showApiErrorToastr(error);
    throw error;
  }
}

export async function returnBorrowBook(id: number) {
  try {
    const response = await axiosInstance.put(`/borrows/return-book/${id}`);
    showCustomToastr("Book returned successfull.", "success");
    return response.data;
  } catch (error) {
    showApiErrorToastr(error);
    throw error;
  }
}
