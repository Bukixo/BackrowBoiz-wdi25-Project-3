angular
  .module('rentApp')
  .factory('Comment', Comment);

Comment.$inject = ['$resource'];
function Comment($resource){
  return new $resource('api/item/:id/comments/:commentId', { id: '@id'},
    { update: { method: 'PUT'}
    });
}
