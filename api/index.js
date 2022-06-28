import axios from "axios";
import { setCookie } from "../utils";

export const myInstance = axios.create({
  baseURL: "http://api.interview.michaelknyazev.com/api/v1/",
});

class Api {

  async login(email, password) {
    const { data } = await myInstance.post("login", { email, password });
    const { access_token, refresh_token } = data.result;
    myInstance.defaults.headers.common["x-access-token"] = access_token;
    localStorage.setItem("email", email);
    setCookie("access-token", access_token);
    setCookie("refresh-token", refresh_token);
    return data;
  }

  async refresh() {
    const refreshToken = getCookie("refresh-token");
    const { data } = await myInstance.post("refresh", null, {
      headers: {
        "x-refresh-token": refreshToken,
      },
    });
    const { access_token } = data.result;
    myInstance.defaults.headers.common["x-access-token"] = access_token;
    setCookie("access-token", access_token);
    return data;
  }

  async getCards(page, limit) {
    const { data } = await myInstance.get("content", {
      params: { page, limit },
    });
    return data.result;
  }

  async getCardsCount() {
    const { data } = await myInstance.get("content/total");
    return data.result.count;
  }
}

const api = new Api();

export default api;
