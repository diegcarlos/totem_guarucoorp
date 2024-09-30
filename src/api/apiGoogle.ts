import axios from 'axios';
import {env} from '/env';
export const apiGoogleGeoCode = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode/json',
  params: {
    key: env.GOOGLE_MAPS_API,
  },
});
