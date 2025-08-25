const tokenKey = "auth_token";
const savedToken = localStorage.getItem(tokenKey);
const BASE_URL = "https://poke-collection-api-production.up.railway.app/";

export const authProvider = {
  isAuthenticated: !!savedToken as boolean,
  token: savedToken as string | null,

  async login(email: string, password: string) {
    const url = `${BASE_URL}/login`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    //fetch API/login
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      authProvider.isAuthenticated = true;
      authProvider.token = data.token;
      localStorage.setItem(tokenKey, data.token);
    } else {
      const error = await response.json();
      throw new Error(error.errors || "Another error in authentication");
    }
  },

  async createAccount(
    email: string,
    first_name: string,
    last_name: string,
    password: string
  ) {
    const url = `${BASE_URL}/signup`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ email, first_name, last_name, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    //fetch API/signup
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      authProvider.isAuthenticated = true;
      authProvider.token = data.token;
      localStorage.setItem(tokenKey, data.token);
    } else {
      const error = await response.json();
      console.log(error.errors.password[0]);
      throw new Error(
        error.errors.password[0] || "Another error in authentication"
      );
    }
  },

  async updateProfile(
    email: string,
    first_name: string,
    last_name: string,
    password: string
  ) {
    const url = `${BASE_URL}/profile`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ email, first_name, last_name, password }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${savedToken}`,
      },
    };
    //fetch API/profile
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      const error = await response.json();
      throw new Error(error.errors || "Another error in authentication");
    }
  },

  logout() {
    localStorage.removeItem(tokenKey);
    authProvider.isAuthenticated = false;
    authProvider.token = null;
  },
};
