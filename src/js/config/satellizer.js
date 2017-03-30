angular
  .module('rentApp')
  .config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';

  $authProvider.github({
    clientId: '6fa44555d50ccd78c8df',
    url: '/api/oauth/github'
  });

  $authProvider.facebook({
    clientId: '1438994726408286',
    url: '/api/oauth/facebook'
  });

  $authProvider.instagram({
    clientId: '081e09dfcabd4ec38a730f3895732495',
    url: '/api/oauth/instagram'
  });

  $authProvider.tokenPrefix = '';

}
