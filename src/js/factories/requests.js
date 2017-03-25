angular
  .module('rentApp')
  .factory('Request', Request); //Our Request Factroy which handels the request Update & delete request requests to our API
//SAtellizer handles the Create Route for Our users

Request.$inject = ['$resource'];
function Request($resource){
  return new $resource('/api/request/:id',
  { id: '@id'},
    { update: { method: 'PUT'}
    });
}
