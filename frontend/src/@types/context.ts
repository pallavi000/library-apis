import { TUser } from "./user";

export type TGlobalContextStates = {
  user: TUser | null;
  token: string;
  setToken: (value: string) => void;
  logout: () => void;
};
