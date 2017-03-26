angular
  .module('rentApp')
  .controller('itemShowCtrl', itemShowCtrl)
  .controller('itemEditCtrl', itemEditCtrl);


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

itemEditCtrl.$inject = ['Item', '$stateParams', '$state'];
function itemEditCtrl(Item, $stateParams, $state) {
  const vm = this;

  vm.item = Item.get($stateParams);

  function itemsUpdate() {
    // The vm.item gives us the full object user so I had to reassign the createdBy to an single Object.id inorder for the form to work because it only takes a Singledatavalue
    vm.item.createdBy = vm.item.createdBy.id;
    console.log(vm.item);
    vm.item
      .$update()
      .then(() => $state.go('itemsShow', $stateParams));
  }

  vm.update = itemsUpdate;
}
