angular
  .module('rentApp')
  .controller( 'itemIndexCtrl', itemIndexCtrl);

itemIndexCtrl.$inject = ['Item','User', 'Request', 'filterFilter', 'orderByFilter', '$scope', '$rootScope'];
function itemIndexCtrl(Item, User, Request, filterFilter, orderByFilter, $scope, $rootScope) {
  const vm = this;
  vm.request = Request.query();
  vm.menuIsOpen = false;

  function stateChange(e, toState){
    vm.pageName = toState.name;
    vm.menuIsOpen = false;
  }

  $rootScope.$on('$stateChangeStart', stateChange);


  Item.query().$promise.then((items) => {
    vm.all = items;
    filterItems();
  });


  function filterItems(){
    const params =  { name: vm.q };
    if(vm.catagory) params.catagory = vm.catagory;
    vm.filtered = filterFilter(vm.all, params);
    vm.filtered = orderByFilter(vm.filtered, vm.sort);
  }

  $scope.$watchGroup([
    ()=> vm.catagory,
    ()=> vm.q,
    ()=> vm.sort
  ],filterItems);

}
// Item is injected from our Factory and makeing a GET request from the API api/item to find all the items
