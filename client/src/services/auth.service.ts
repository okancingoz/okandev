import { ICredentials, ILoginResponse } from "@/types/auth.types";
import http from "@/services/http";

export const authService = {
  async loginUser(credentials: ICredentials): Promise<ILoginResponse> {
    const { data } = await http.post("/auth/login", credentials);
    return data;
  },
};
