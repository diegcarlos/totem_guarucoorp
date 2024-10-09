import axios, { AxiosResponse } from 'axios';
import { env } from '../env';

export const SearchAddressGoogle = async (input: string, origin: string) => {
  const searchAddress: AxiosResponse<any> = await axios.get(
    env.URL_API_GOOGLE_GEO,
    {
      params: {
        input,
        origin,
        key: env.GOOGLE_MAPS_API,
        components: 'country:br',
        language: 'pt_BR',
        region: 'BR',
      },
    },
  );

  return searchAddress.data.predictions;
};

export const SearchAddressLocation = async (place_id: string) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json`,
    {
      params: {
        place_id,
        key: env.GOOGLE_MAPS_API,
        language: 'pt_BR',
        region: 'BR',
      },
    },
  );

  return response.data.result.geometry.location;
};
