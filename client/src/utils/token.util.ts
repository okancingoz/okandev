const TOKEN_KEY = "token";

export const tokenUtils = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },
};
