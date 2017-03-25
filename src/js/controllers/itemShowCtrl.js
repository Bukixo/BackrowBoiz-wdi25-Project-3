angular
  .module('rentApp')
  .controller('itemShowCtrl', itemShowCtrl)
  .controller('itemsEditCtrl', itemsEditCtrl);

itemShowCtrl.$inject = ['Item', '$stateParams', '$state'];
function itemShowCtrl(Item, $stateParams, $state){
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

itemsEditCtrl.$inject = ['Item', '$stateParams', '$state'];
function itemsEditCtrl(Item, $stateParams, $state) {
  const vm = this;

  vm.item = Item.get($stateParams);

  function itemsUpdate() {
    vm.item
      .$update()
      .then(() => $state.go('itemsShow', $stateParams));
  }

  vm.update = itemsUpdate;
}
