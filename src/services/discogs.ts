/* eslint-disable camelcase */

import makeRequest from './dataService';

export interface Artist {
  anv: string;
  id: number;
  join: string;
  name: string;
  resource_url: string;
  role: string;
  tracks: string;
}

export interface Format {
  name: string;
  qty: string;
  text: string;
  descriptions: string[];
}

export interface Label {
  catno: string;
  entity_type: string;
  entity_type_name: string;
  id: number;
  name: string;
  resource_url: string;
}

export interface ReleaseBasicInformation {
  artists: Artist[];
  cover_image: string;
  formats: Format[];
  genres: string[];
  id: number;
  labels: Label[];
  master_id: number;
  master_url: string;
  styles: string[];
  thumb: string;
  title: string;
  year: number;
}

export interface Release {
  id: number;
  artists: Record<string, any>[];
  title: string;
  year: number;
  date_added: string;
  cover_image: string;
  thumb: string;
  url: string;
}

export const getInventory = async (): Promise<Release[]> => {
  const nextUrl = 'https://api.willkronberg.dev/records';
  const response = await makeRequest<any>(nextUrl);

  return response.data;
};
