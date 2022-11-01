export default async function makeRequest<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => resolve(response.json()))
      .catch((error: Error) => reject(error));
  });
}
