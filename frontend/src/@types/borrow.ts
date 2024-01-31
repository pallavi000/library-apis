import { TBook } from "./book";
import { TUser } from "./user";

export type TBorrow = {
  id: number;
  user: TUser;
  book: TBook;
  borrowDate: string;
  dueDate: string;
  returnDate: string;
  isReturned: boolean;
};

export type TBorrowInputs = {
  user: number;
  book: number;
  dueDate: string;
};
