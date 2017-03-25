angular
  .module('rentApp')
  .controller( 'itemIndexCtrl', itemIndexCtrl);

itemIndexCtrl.$inject = ['Item','User', 'Request'];
function itemIndexCtrl(Item, User, Request) {
  const vm = this;

  vm.all = Item.query();
  vm.request = Request.query();
  // vm.items = Item.query();
  // vm.profiles = User.query(); // Remove this later it's just to see if the HTTP works
}
// Item is injected from our Factory and makeing a GET request from the API api/item to find all the items
