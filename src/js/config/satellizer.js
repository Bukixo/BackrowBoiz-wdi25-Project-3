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
}
