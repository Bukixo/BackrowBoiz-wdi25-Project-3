angular
  .module('rentApp')
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['$auth', '$state'];
function RegisterCtrl($auth, $state){
  const vm = this;
  vm.user = {};

  function createUser(){
    console.log('here', vm.user);
    console.log('CreateUser exectues');
    $auth.signup(vm.user)
    .then(()=> $state.go('login'));
  }
  vm.createUser = createUser;
}
