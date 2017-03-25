angular
  .module('rentApp')
  .controller('itemNewCtrl', itemNewCtrl);

itemNewCtrl.$inject = ['Item', '$state'];
function itemNewCtrl(Item, $state){
  const vm = this;

  vm.item = {};

  function itemsCreate() {
    if(vm.newForm.$valid) {
      Item
        .save(vm.item)
        .$promise
        .then(() => $state.go('itemsIndex'));
    }
  }

  vm.create = itemsCreate;
}
