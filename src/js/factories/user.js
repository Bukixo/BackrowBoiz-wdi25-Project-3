angular
  .module('rentApp')
  .factory('User', User); //Our User Factroy which handels the request Update & delete request requests to our API
//SAtellizer handles the Create Route for Our users

User.$inject = ['$resource'];
function User($resource){
  return new $resource('/api/users/:id', { id: '@id'},
    { 'update': { method: 'PUT'}
    });
    // Default will use the params:id to find User but if we aven't specified finding users
}
