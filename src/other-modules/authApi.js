const axios = require('axios');

/**
 * Object will contain functions related to auth API calls from the desktop app
 */
const authApi = {};
authApi.login = body => axios.post(`${body.serverAddress}:3000/login`, body);
authApi.signout = () => axios.get(`${body.serverAddress}/signout`);

/**
 * Intercept all axios requests and append custom 'x-auth-token' header if
 * accessToken is available in localStorage
 */
axios.interceptors.request.use(req => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) req.headers['x-auth-token'] = accessToken;
  return req;
});

/**
 * Intercept all axios responses where server rejected a request due to invalid token.
 * Refresh token and try again
 */
axios.interceptors.response.use(res => res, err => {
  const reqOriginal = err.config;
  const refreshToken = localStorage.getItem('refreshToken');
  /**
   * check for (1) a valid refresh token in local storage
   * (2) a 401 status code indicating that the access token has expired
   * (3) that a token refresh hasn't already been attempted
   */
  if (refreshToken && err.response.status === 401 && !reqOriginal._retry) {
    reqOriginal._retry = true;
    return authApi.refreshToken({ refreshToken })
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('accessToken', res.data.accessToken);
          return axios(reqOriginal);
        }
      })
      .catch(error => console.error(error));
  }
  return Promise.reject(err);
});


export default authApi;
 