angular
  .module('rentApp')
  .factory('Comments', Comments);

Comments.$inject = ['$resource'];
function Comments($resource){
  return new $resource('/api/item/:itemId/comments/:id', { id: '@id'},
    { update: { method: 'PUT'}
    });
}
