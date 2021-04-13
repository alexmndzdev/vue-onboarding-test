import axios from 'axios';

const baseURL = 'https://reqres.in/api/';
const instance = axios.create({
  baseURL,
  // headers: {'X-Custom-Header': 'foobar'}
});

// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;
