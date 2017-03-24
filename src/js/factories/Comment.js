angular
  .module('rentApp')
  .factory('Comment', Comments);

Comments.$inject = ['$resource'];
function Comments($resource){
  return new $resource('/api/item/:id/comments/:commentId', { id: '@id'},
    { update: { method: 'PUT'}
    });
}
