import { instance } from "./api.config.js"

export const AuthService = {
  login: async (login, password) => {
      return await instance.post("/api/login", { login, password }, { isLogin: true })
  }
  , refreshToken: async () => {
      return await instance.get("/api/refresh");
  }
  , logout: async () => {
      //    return instance.post("/api/logout")
  }
}
