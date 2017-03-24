angular
  .module('rentApp')
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['$state'];
function RegisterCtrl($state){
  const vm = this;

  vm.credentials; // Is going the be the ng-model form our formdata
  function createUser(){
    //$state.go('login');
  }
  vm.createUser = createUser();
}
