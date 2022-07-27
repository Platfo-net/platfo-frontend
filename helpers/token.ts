import Cookies from "universal-cookie";

const cookie = new Cookies();

export const tokenObj = {
  setAccessToken(t: string, option) {
    cookie.set("access_token", t, option);
  },
  getAccessToken() {
    return cookie.get("access_token");
  },
  getAccessTokenFaceBook() {
    return cookie.get("auth-token");
  },
  setRefreshToken(t: string, option) {
    cookie.set("refresh_token", t, option);
  },
  getRefreshToken() {
    return cookie.get("refresh_token");
  },
  setToken(token: any) {
    // const date = new Date();
    // date.setTime(date.getTime() + token.expires_in * 60 * 1000);
    const options = { path: "/" };
    this.setAccessToken(token, options);
    // this.setRefreshToken(token.refresh_token, options);
  },
  removeToken() {
    cookie.remove("access_token", { path: "/" });
    cookie.remove("refresh_token");
  },
};
