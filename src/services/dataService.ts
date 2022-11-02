export default async function makeRequest<T>(url: string): Promise<T> {
  const headers = {
    'User-Agent': 'WoolyDiscogsBrowser/1.0 +http://willkronberg.dev',
    'Content-Type': 'application/json',
  };

  return new Promise((resolve, reject) => {
    fetch(url, { headers })
      .then((response) => resolve(response.json()))
      .catch((error: Error) => reject(error));
  });
}
