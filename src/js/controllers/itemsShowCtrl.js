angular
  .module('rentApp')
  .controller('ItemsShowCtrl', ItemsShowCtrl)
  .controller('ItemsEditCtrl', ItemsEditCtrl);

ItemsShowCtrl.$inject = ['Item', '$stateParams', '$state'];
function ItemsShowCtrl(Item, $stateParams, $state){
  const vm = this;
  // vm.newComment = {};
  vm.item = Item.get($stateParams);

  function itemsDelete() {
    vm.item
      .$remove()
      .then(() => $state.go('itemsIndex'));
  }

  vm.delete = itemsDelete;

}

ItemsEditCtrl.$inject = ['Item', '$stateParams', '$state'];
function ItemsEditCtrl(Item, $stateParams, $state) {
  const vm = this;

  vm.item = Item.get($stateParams);

  function itemsUpdate() {
    vm.item
      .$update()
      .then(() => $state.go('itemsShow', $stateParams));
  }

  vm.update = itemsUpdate;
}
