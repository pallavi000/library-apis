import { TBook } from "./book";
import { TUser } from "./user";

export type TBorrow = {
  id: number;
  user: TUser;
  book: TBook;
  borrowDate: string;
  returnDate: string;
};
