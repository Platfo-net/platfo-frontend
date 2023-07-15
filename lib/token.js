import Cookies from 'universal-cookie';

const cookie = new Cookies();

export const tokenObj = {
  /**
   * @param {string} token
   * @param {import("universal-cookie").CookieSetOptions | undefined} option
   */
  setAccessToken(token, option) {
    cookie.set('access_token', token, option);
  },
  getAccessToken() {
    return cookie.get('access_token');
  },
  getAccessTokenFaceBook() {
    return cookie.get('auth-token');
  },
  /**
   * @param {string} token
   * @param {import("universal-cookie").CookieSetOptions | undefined} option
   */
  setRefreshToken(token, option) {
    cookie.set('refresh_token', token, option);
  },
  getRefreshToken() {
    return cookie.get('refresh_token');
  },
  /**
   * @param {string} token
   */
  setToken(token) {
    // const date = new Date();
    // date.setTime(date.getTime() + token.expires_in * 60 * 1000);
    const options = { path: '/' };
    this.setAccessToken(token, options);
    // this.setRefreshToken(token.refresh_token, options);
  },
  removeToken() {
    cookie.remove('access_token', { path: '/' });
    cookie.remove('refresh_token');
  },
};
