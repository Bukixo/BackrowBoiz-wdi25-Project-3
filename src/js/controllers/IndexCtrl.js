angular
  .module('rentApp')
  .controller( 'IndexCtrl', IndexCtrl);


IndexCtrl.$inject = ['Item'];
function IndexCtrl(Item) {
  const vm = this;
  vm.items = Item.query();
}
// Item is injected from our Factory and makeing a GET request from the API /api/item to find all the items
