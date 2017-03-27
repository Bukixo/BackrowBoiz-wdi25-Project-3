angular
  .module('rentApp')
  .controller( 'itemIndexCtrl', itemIndexCtrl);

itemIndexCtrl.$inject = ['Item','User', 'Request', 'filterFilter', 'orderByFilter', '$scope'];
function itemIndexCtrl(Item, User, Request, filterFilter, orderByFilter, $scope) {

  const vm = this;

  vm.all = Item.query();
  vm.request = Request.query();
  // vm.items = Item.query();
  // vm.profiles = User.query(); // Remove this later it's just to see if the HTTP works
  function filterItems(){
    const params = { name: vm.q };
    //  if(vm.useStrength) params.strength = vm.strength;
    //  if(vm.useRoast) params.roast = vm.roast;
    vm.filtered = filterFilter(vm.all, params);
    vm.filtered = orderByFilter(vm.filtered, vm.sort);
  }
  
  $scope.$watchGroup([
    ()=> vm.q,
    ()=> vm.sort
  ],filterItems);



}
// Item is injected from our Factory and makeing a GET request from the API api/item to find all the items
