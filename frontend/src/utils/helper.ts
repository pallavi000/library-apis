import axios, { AxiosError } from "axios";
import { VariantType, enqueueSnackbar } from "notistack";

export const getNowDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}/${month}/${year}`;
};

export const valueToText = (value: number) => {
  return `$${value}`;
};

export const showApiErrorToastr = (error: any) => {
  enqueueSnackbar(
    axios.isAxiosError(error) && error.response?.data?.message
      ? error.response?.data?.message
      : error.message,
    {
      variant: "error",
    }
  );
};

export const showCustomToastr = (message: string, variant: VariantType) => {
  enqueueSnackbar(message, { variant });
};

export const queryBuilder = (key: string, arr: string[] | number[]) => {
  return arr.map((a) => `${key}=${encodeURIComponent(a)}`).join("&");
};

export function generateMUIAutocompleteOptions<T>(arr: T[], key: keyof T) {
  return arr.map((a) => ({ label: a[key] }));
}
