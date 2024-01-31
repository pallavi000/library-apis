import { TAuthor } from "./author";
import { TGenre } from "./genre";

export type TReservation = {
  id: number;
  userId: number;
  bookId: number;
  reservationDate: string;
  expirationDate: string;
  createdAt: string;
  updatedAt: string;
};

export type TBook = {
  id: number;
  author: TAuthor;
  genra: TGenre;
  title: string;
  isAvailable: boolean;
  publishedYear: number;
  publisher: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  reservations: TReservation[];
};
export type TBookInputs = {
  author: number;
  genra: number;
  title: string;
  isAvailable: boolean;
  publishedYear: number;
  publisher: string;
  image: string;
};
