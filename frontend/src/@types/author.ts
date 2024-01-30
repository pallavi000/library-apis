export type TAuthor = {
  id: number;
  name: string;
  image?: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
};

export type TAuthorInputs = {
  name: string;
  image: string;
  bio: string;
};
