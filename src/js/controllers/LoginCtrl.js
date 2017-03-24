angular
  .module('rentApp')
  .controller('LoginCtrl', LoginCtrl);


LoginCtrl.$inject = ['$auth', '$state'];
function LoginCtrl($auth, $state) {
  const vm = this;
  vm.credentials = {};

  function submit() {
    if(vm.loginForm.$valid){
      $auth.login(vm.credentials)
      .then(() => $state.go('itemIndex'));
    }
  }

  vm.submit = submit;
}
