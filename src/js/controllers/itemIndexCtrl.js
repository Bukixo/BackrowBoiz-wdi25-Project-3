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


// CoffeeIndexCtrl.$inject = ['Coffee', 'filterFilter', 'orderByFilter', '$scope'];
// function CoffeeIndexCtrl(Coffee, filterFilter, orderByFilter, $scope) {
//   const vm = this;
//   vm.all = Coffee.query();
//
//   function filterCoffee(){
//     const params = { name: vm.q };
//     if(vm.useStrength) params.strength = vm.strength;
//     if(vm.useRoast) params.roast = vm.roast;
//     vm.filtered = filterFilter(vm.all, params);
//
//     vm.filtered = orderByFilter(vm.filtered, vm.sort);
//   }
//
//   $scope.$watchGroup([
//     ()=> vm.q,
//     ()=> vm.useRoast,
//     ()=> vm.roast,
//     ()=> vm.useStrength,
//     ()=> vm.strength,
//     ()=> vm.sort
//   ],filterCoffee);
// }
