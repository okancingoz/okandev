import { IUser } from "@/interfaces/user.interface";

export interface ICredentials {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user?: IUser;
}
