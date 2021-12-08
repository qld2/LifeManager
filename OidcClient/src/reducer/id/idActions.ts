import { User } from 'oidc-client';
import { LOGIN, LOGOUT, IDAction } from './model/actions';

export const login = (user:User | null):IDAction => ({
  type: LOGIN,
  user,
});

export const logout = ():IDAction => ({
  type: LOGOUT,
});
