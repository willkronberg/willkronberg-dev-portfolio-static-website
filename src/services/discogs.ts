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
  basic_information: ReleaseBasicInformation;
  date_added: string;
  id: number;
  instance_id: number;
  rating: number;
}

export const getInventory = async (): Promise<Release[]> => {
  let releases: Release[] = [];
  let nextUrl = 'https://api.discogs.com/users/will.kronberg/collection/folders/0/releases';
  do {
    // eslint-disable-next-line no-await-in-loop
    const data = await makeRequest<any>(nextUrl);

    releases = [...releases, ...data.releases];

    nextUrl = data.pagination.urls.next;
  } while (nextUrl);

  return releases;
};
