/* eslint-disable import/prefer-default-export */

import makeRequest from './dataService';

export const getArticles = async (): Promise<Record<string, any>[]> => {
  const nextUrl = 'https://api.willkronberg.dev/articles';
  const response = await makeRequest<any>(nextUrl);

  return response.data;
};
