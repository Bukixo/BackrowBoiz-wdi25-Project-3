angular
  .module('rentApp')
  .factory('Item', Item);

Item.$inject = ['$resource'];
function Item($resource){
  return new $resource('api/item/:id', { id: '@id'},
    { update: { method: 'PUT'}
    });
}
