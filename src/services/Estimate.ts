import { apiTaxi } from 'api/apiTaxi';
import { AxiosResponse } from 'axios';

interface Props {
  init_lat: number;
  init_lng: number;
  end_lat: number;
  end_lng: number;
  reference_date?: string;
  distance: number;
  route_type?: string;
  encoded_polyline?: string;
}

export interface TypesGetEstimate {
  status: number;
  data: {
    total_categories: number;
    categories: [
      {
        category_id: string;
        display_name: string;
        capacity: number;
        pickup_estimate: string;
        estimate: number;
        high_estimate: number;
        low_estimate: number;
        fixed_price: string;
        currency_code: string;
        distance: string;
        estimate_id: string;
        taximeter_configs: [];
      },
    ];
    estimate_fare: '';
  };
}

const url = '/api/booking/estimate/json';
export const postEstimate = async (
  props: Props,
): Promise<TypesGetEstimate | undefined> => {
  try {
    const resp: AxiosResponse<TypesGetEstimate> = await apiTaxi.post(
      url,
      {},
      { params: { ...props } },
    );
    return resp.data;
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};
