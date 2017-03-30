angular
  .module('rentApp')
  .factory('Item', Item);

Item.$inject = ['$resource'];
function Item($resource){
  const Item = new $resource('/api/item/:id', { id: '@id'},
    { update: { method: 'PUT'}
    });

  Item.prototype.location = function(){
    if(this.location){
      return this.location;
    }
  };
  return Item;
}
