import axios from 'axios';

let baseURL = 'https://reqres.in/api/';
const headers = { Authorization: localStorage.getItem('token') || '' };
const RE = axios.create({
  baseURL,
  headers,
});

baseURL = 'https://my-json-server.typicode.com/alexmndzdev/vue-onboarding-test/';
const TC = axios.create({
  baseURL,
  headers,
});

const setTokenHeader = (token) => {
  localStorage.setItem('token', token);
  RE.defaults.headers.common.Authorization = token;
};

export default {
  RE,
  TC,
  setTokenHeader,
};
