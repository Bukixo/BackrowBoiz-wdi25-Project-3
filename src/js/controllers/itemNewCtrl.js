angular
  .module('rentApp')
  .controller('itemsNewCtrl', itemsNewCtrl);

itemsNewCtrl.$inject = ['Item', '$state'];
function itemsNewCtrl(Item, $state){
  const vm = this;
  console.log('wors');
  vm.item = {};

  function itemsCreate() {
    console.log(vm.item);
    if(vm.newForm.$valid) {
      console.log(vm.item);
      Item
        .save(vm.item)
        .$promise
        .then(() => $state.go('itemsIndex'));
    }
  }

  vm.create = itemsCreate;
}
