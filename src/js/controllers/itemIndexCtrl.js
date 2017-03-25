angular
  .module('rentApp')
  .controller( 'itemIndexCtrl', itemIndexCtrl);


itemIndexCtrl.$inject = ['Item','User'];
function itemIndexCtrl(Item, User) {
  const vm = this;
  vm.items = Item.query();
  vm.profiles = User.query(); // Remove this later it's just to see if the HTTP works
}
// Item is injected from our Factory and makeing a GET request from the API /api/item to find all the items
