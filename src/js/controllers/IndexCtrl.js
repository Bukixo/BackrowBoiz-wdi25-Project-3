angular
  .module('rentApp')
  .controller( 'IndexCtrl', IndexCtrl);


IndexCtrl.$inject = ['Item','User'];
function IndexCtrl(Item, User) {
  const vm = this;
  vm.items = Item.query();
  vm.profiles = User.query(); // Remove this later it's just to see if the HTTP works
}
// Item is injected from our Factory and makeing a GET request from the API /api/item to find all the items
