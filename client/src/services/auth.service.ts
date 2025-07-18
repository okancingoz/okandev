import http from "@/services/http";
import { ICredentials, ILoginResponse } from "@/types/auth.types";
import { setToken } from "@/utils/tokenUtils";

export const authService = {
  async loginUser(credentials: ICredentials): Promise<ILoginResponse> {
    const { data } = await http.post("/auth/login", credentials, {
      withCredentials: true,
    });

    if (data.token) {
      setToken(data.token);
    }

    return data;
  },
};
