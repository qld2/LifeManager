import Function from 'util/Function';

export function getSecret(token: string | undefined, successCallback: Function<void, void> | null,
  errorCallback: Function<string | null, void> | null) {
  fetch('https://localhost:44362/secret', {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status !== 200) {
        return null;
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
      // if (successCallback) successCallback();
    })
    .catch((error) => {
      console.log(error);
      // if (errorCallback) errorCallback(error);
    });
}

export function getSecret2(token: string | undefined, successCallback: Function<void, void> | null,
  errorCallback: Function<string | null, void> | null) {
  fetch('https://localhost:44362/secret', {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status !== 200) {
        return null;
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
      // if (successCallback) successCallback();
    })
    .catch((error) => {
      console.log(error);
      // if (errorCallback) errorCallback(error);
    });
}
