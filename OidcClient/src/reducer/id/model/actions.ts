import { User } from 'oidc-client';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

type LoginAction = {
  type: typeof LOGIN,
  user: User | null
};

type LogoutAction = {
  type: typeof LOGOUT
};

export type IDAction = LoginAction | LogoutAction;
