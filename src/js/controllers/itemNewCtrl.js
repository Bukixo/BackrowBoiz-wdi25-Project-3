angular
  .module('rentApp')
  .controller('itemsNewCtrl', itemsNewCtrl);

itemsNewCtrl.$inject = ['Item', '$state'];
function itemsNewCtrl(Item, $state){
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

// angular.module('ui.bootstrap.demo').controller('PopoverDemoCtrl', function ($scope, $sce) {
//   $scope.dynamicPopover = {
//     content: 'Hello, World!',
//     templateUrl: 'myPopoverTemplate.html',
//     title: 'Title'
//   };
