import { makeAutoObservable } from "mobx";
import { AuthService } from "./AuthService.js";

class AuthStore {
  isAuth = false;
  isAuthInProgress = false;

  constructor() {
    makeAutoObservable(this);
  }

  async login(login, password) {
    this.isAuthInProgress = true;
    console.log("login");
    try {
      const resp = await AuthService.login(login, password);
      localStorage.setItem("token", resp.data.accessToken);
      this.isAuth = true;
    } catch (err) {
      console.log("login error", err);
    } finally {
      this.isAuthInProgress = false;
    }
  }

  async checkAuth() {
    this.isAuthInProgress = true;
    console.log("checkAuth");
    try {
      const resp = await AuthService.refreshToken();
      localStorage.setItem("token", resp.data.accessToken);
      this.isAuth = true;
    } catch (err) {
      console.log("login error", err);
    } finally {
      this.isAuthInProgress = false;
    }
  }

  async logout() {
    this.isAuthInProgress = true;
    try {
      await AuthService.logout();
      this.isAuth = false;
      localStorage.removeItem("token");
    } catch (err) {
      console.log("logout error");
    } finally {
      this.isAuthInProgress = false;
    }
  }

}

let authStore = new AuthStore();
export default authStore;
