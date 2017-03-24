angular
  .module('rentApp')
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['$state', '$auth'];
function RegisterCtrl($state, $auth){
  const vm = this;
  vm.user = {};

  vm.credentials; // Is going the be the ng-model form our formdata
  function createUser(){
    $auth.signup(vm.user)
    .then(()=> $state.go('login'));
    //$state.go('login');
  }
  vm.createUser = createUser();
}
