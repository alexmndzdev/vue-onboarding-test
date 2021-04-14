import axios from 'axios';

let baseURL = 'https://reqres.in/api/';
const RE = axios.create({
  baseURL,
  // headers: {'X-Custom-Header': 'foobar'}
});

baseURL = 'https://my-json-server.typicode.com/alexmndzdev/vue-onboarding-test/';
const TC = axios.create({
  baseURL,
});
// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default {
  RE,
  TC,
};
