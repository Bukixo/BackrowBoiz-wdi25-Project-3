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
    url: '/api/oauth/facebook' //could be fucked
    // responseType: 'token'
  });

  $authProvider.tokenPrefix = '';

  $authProvider.instagram({
    clientId: 'Instagram Client ID'
  });

}
