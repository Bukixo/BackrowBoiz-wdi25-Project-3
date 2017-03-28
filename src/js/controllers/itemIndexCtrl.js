angular
  .module('rentApp')
  .controller( 'itemIndexCtrl', itemIndexCtrl);

itemIndexCtrl.$inject = ['Item','User', 'Request', 'filterFilter', 'orderByFilter', '$scope'];
function itemIndexCtrl(Item, User, Request, filterFilter, orderByFilter, $scope) {

  const vm = this;

  vm.all = Item.query();
  vm.request = Request.query();


  function filterItems(){
    const params =  { name: vm.q};
    if(vm.catagory) params.catagory = vm.catagory;
    vm.filtered = filterFilter(vm.all, params);
    //vm.filtered = orderByFilter(vm.filtered, vm.sort);
  }

  $scope.$watchGroup([
    ()=> vm.catagory,
    ()=> vm.q,
    ()=> vm.sort
  ],filterItems);

  //  function($scope) {
  //     $scope.filters = { };
  //
  //     $scope.links = [
  //         {name: 'Apple', category: 'Fruit'},
  //         {name: 'Pear', category: 'Fruit'},
  //         {name: 'Almond', category: 'Nut'},
  //         {name: 'Mango', category: 'Fruit'},
  //         {name: 'Cashew', category: 'Nut'}
  //     ];
  // });


}
// Item is injected from our Factory and makeing a GET request from the API api/item to find all the items
