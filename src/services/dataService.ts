export default async function makeRequest<T>(url: string): Promise<T> {
  const headers = {
    'User-Agent': 'WoolyDiscogsBrowser/1.0 +http://willkronberg.dev',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        const responseBody = response.json();

        if (response.status >= 300) {
          reject(responseBody);
        }
        resolve(responseBody);
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
}
