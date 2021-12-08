import { createUserManager } from 'redux-oidc';

const userManagerConfig = {
  authority: 'https://localhost:44396/',
  client_id: 'client_id_js',
  redirect_uri: 'http://localhost:9000/Callback',
  response_type: 'id_token token',
  scope: 'openid email WardrobeApi rc.scope',
  loadUserInfo: true,
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
