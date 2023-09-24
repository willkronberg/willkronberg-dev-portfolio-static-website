/* eslint-disable import/prefer-default-export */

import makeRequest from './dataService';

export interface Article {
  id: string;
  title: string;
  description: string;
  link: string;
  published_date: string;
}

export const getArticles = async (): Promise<Article[]> => {
  try {
    const nextUrl = 'https://api.willkronberg.dev/articles';
    const response = await makeRequest<any>(nextUrl);

    return response.data;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};
