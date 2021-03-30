import axios from 'axios';

const fakeapi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default fakeapi;
