const axios = require('axios');

/**
 * Object will contain functions related to authentication requests
 */
const authApi = {};
authApi.login = body => axios.post(`${body.serverAddress}:3000/login`, body);
authApi.signout = () => axios.get(`${body.serverAddress}/signout`);

/**
 * Intercept all axios requests and append custom 'x-auth-token' header 
 * if accessToken is available in localStorage
 */
axios.interceptors.request.use(req => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) req.headers['x-auth-token'] = accessToken;
  return req;
});


export default authApi;
 