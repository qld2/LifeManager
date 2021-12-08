import Function from 'util/Function';

export type LoginDTO = {
  username: string,
  password: string
};
export function submitLogin(login: LoginDTO, successCallback: Function<string | null, void> | null,
  errorCallback: Function<string | null, void> | null) {
  /* eslint-disable no-undef */
  fetch('https://localhost:6001/login', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(login),
    credentials: 'include',
  })
    .then((response) => {
      if (response.status !== 200) {
        return null;
      }
      return response.text();
    })
    .then((data) => {
      if (successCallback !== null) successCallback(data);
    })
    .catch((error) => {
      if (errorCallback !== null) {
        errorCallback(error);
      }
    });
}

export function cookieLogin(successCallback: Function<string | null, void> | null,
  errorCallback: Function<string | null, void> | null):void {
  /* eslint-disable no-undef */
  fetch('https://localhost:6001/', {
    method: 'GET',
    credentials: 'include',
  })
    .then((response) => {
      if (response.status !== 200) {
        return null;
      }
      return response.text();
    })
    .then((d) => {
      if (successCallback !== null) successCallback(d);
    })
    .catch((error) => {
      if (errorCallback !== null) errorCallback(error);
    });
}

export type RegistrationDTO = {
  email: string,
  password: string,
  dateOfBirth: string,
  gender: string
};
export function register(data: RegistrationDTO, successCallback: Function<string | null, void> | null,
  errorCallback: Function<string | null, void> | null) {
  /* eslint-disable no-undef */
  fetch('https://localhost:6001/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status !== 200) {
        return null;
      }
      return response.text();
    })
    .then((d) => {
      if (successCallback !== null)successCallback(d);
    })
    .catch((error) => {
      if (errorCallback !== null)errorCallback(error);
    });
}
