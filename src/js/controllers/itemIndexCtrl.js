angular
  .module('rentApp')
  .controller( 'itemsIndexCtrl', itemsIndexCtrl);


itemsIndexCtrl.$inject = ['Item','User'];
function itemsIndexCtrl(Item, User) {
  const vm = this;

  vm.all = Item.query();
  // vm.items = Item.query();
  // vm.profiles = User.query(); // Remove this later it's just to see if the HTTP works
}
// Item is injected from our Factory and makeing a GET request from the API api/items to find all the items
