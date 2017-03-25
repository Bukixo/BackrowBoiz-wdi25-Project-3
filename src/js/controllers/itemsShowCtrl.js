angular
  .module('rentApp')
  .controller('itemShowCtrl', itemShowCtrl)
  .controller('itemEditCtrl', itemEditCtrl);


itemsShowCtrl.$inject = ['Item', '$stateParams', '$state'];
function itemsShowCtrl(Item, $stateParams, $state){
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

itemEditCtrl.$inject = ['Item', '$stateParams', '$state'];
function itemEditCtrl(Item, $stateParams, $state) {
  const vm = this;

  vm.item = Item.get($stateParams);

  function itemsUpdate() {
    vm.item
      .$update()
      .then(() => $state.go('itemsShow', $stateParams));
  }

  vm.update = itemsUpdate;
}
