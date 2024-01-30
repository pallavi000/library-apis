import axiosInstance from "../utils/AxiosInstance";

export async function fetchAllBorrows() {
  try {
    const response = await axiosInstance.get("/borrows");
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
}
