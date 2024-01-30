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
