import { instance } from "./api.config.js"

export const AuthService = {
  login: (login, password) => {
      return instance.post("/api/login", {login, password})
  }
  , refreshToken: () => {
      return instance.get("/api/refresh");
  }
  // , logout: () => {
  //     return instance.post("/api/logout")
  // }
}
