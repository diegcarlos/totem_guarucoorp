import axios from 'axios';
import {env} from '/env';
export const apiTaxi = axios.create({
  baseURL: env.TAXI_API.URL,
  auth: {
    username: env.TAXI_API.AUTH.USERNAME,
    password: env.TAXI_API.AUTH.PASSWORD,
  },
});
