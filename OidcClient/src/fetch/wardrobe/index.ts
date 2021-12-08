import Function from 'util/Function';

export type ClothingDTO = {
  name: string,
  type: string,
  color: string
};

export function getClothingLibrary(token: string | undefined, successCallback: Function<ClothingDTO[], void> | null,
  errorCallback: Function<string | null, void> | null) {
  if (!token) return;
  /* eslint-disable no-undef */
  // fetch('https://localhost:44396/api/clothes', {
  fetch('https://localhost:44362/api/clothes', {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json())
    .then((data) => {
      if (successCallback) successCallback(data);
    })
    .catch((error) => {
      if (errorCallback) errorCallback(error);
    });
}

export function addClothingArticle(token: string | undefined, article: ClothingDTO, successCallback: Function<void, void> | null,
  errorCallback: Function<string | null, void> | null) {
  fetch('https://localhost:44362/api/clothes/add', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  })
    .then((response) => {
      if (response.status !== 200) {
        return null;
      }
      return response.text();
    })
    .then((data) => {
      if (successCallback) successCallback();
    })
    .catch((error) => {
      if (errorCallback) errorCallback(error);
    });
}
