/* eslint-disable import/prefer-default-export */

import makeRequest from './dataService';

export const getArticles = async (): Promise<Record<string, any>[]> => {
  // const nextUrl = 'https://api.willkronberg.dev/articles';
  // const response = await makeRequest<any>(nextUrl);

  // return response.data;

  return [
    {
      id: 'dffabb9e2094',
      tags: {},
      claps: 0,
      last_modified_at: '2022-11-06 23:24:06',
      published_at: '2022-11-06 23:24:06',
      url: 'https://medium.com/willkronberg-dev/introduction-dffabb9e2094',
      image_url: '',
      lang: 'en',
      publication_id: '31eb84b71f2d',
      word_count: 31,
      title: 'Introduction',
      reading_time: 0.11698113207547,
      responses_count: 0,
      voters: 0,
      topics: ['mental-health'],
      author: '49a22254c970',
      subtitle: 'Just making a quick introductory post. I will be using this as a way to share some helpful career and life experiences as an autistic…',
    },
  ];
};
