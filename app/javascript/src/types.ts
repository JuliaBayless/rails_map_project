export interface RouteData {
  address_1: string;
  lat_1: number;
  lng_1: number;
  address_2: string;
  lat_2: number;
  lng_2: number;
  distance: number | string;
  title: string;
}

export interface Address extends RouteData {
  id: number;
  updated_at: string;
  created_at: string;
  user_id: number;
}
