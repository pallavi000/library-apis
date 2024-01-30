export type TAvatarInputs = {
  avatar: File;
};

export interface LoginInputs {
  email: string;
  password: string;
}

export interface RegisterInputs extends LoginInputs {
  name: string;
}

export type TMember = {
  id: number;
  memberType: string;
  memberSince: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  user: TUser;
};

export type TUser = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  member?: TMember;
};

export type TMemberInputs = {
  memberType: string;
  user: number;
  isActive: boolean;
};
