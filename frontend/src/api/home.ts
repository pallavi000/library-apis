import axiosInstance from "../utils/AxiosInstance";

export async function fetchAllGenre() {
  try {
    const response = await axiosInstance.get("/genra");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAllAuthor() {
  try {
    const response = await axiosInstance.get("/authors");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAllBook() {
  try {
    const response = await axiosInstance.get("/books");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchBooksPagination(
  page = 1,
  limit = 10,
  genreId = 0,
  authorId = 0
) {
  try {
    const response = await axiosInstance.get(
      `/books/get/?page=${page}&limit=${limit}&genre=${genreId}&author=${authorId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchBookById(id: number) {
  try {
    const response = await axiosInstance.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
