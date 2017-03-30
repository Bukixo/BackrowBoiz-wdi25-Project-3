angular
  .module('rentApp')
  .controller( 'MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth', 'filterFilter', 'orderByFilter'];
function MainCtrl($rootScope, $state, $auth, filterFilter, orderByFilter) {
  const vm = this;
  vm.navIsOpen = false;

  // const socket = io('http://localhost:4001');
  // socket.emit('yo');
  // vm.send = sendMsg;
  // function sendMsg(){
  //   socket.emit('chat message', vm.socketMessage);
  //   vm.socketMessage = '';
  //   return false;
  // }
  //
  // socket.on('chat message', function(msg){
  //   // var mess = document.createElement('div');
  //   // mess.innerHTML = msg;
  //   vm.message = msg;
  //   console.log('works');
  // });

  vm.isAuthenticated = $auth.isAuthenticated;

  vm.logout = logout;

  function logout() {
    $auth.logout(); //remove the token
    location.reload();
    $state.go('login');
  }

  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;
    vm.message = err.data.message;
    if(err.status === 401) $state.go('login');
  });

  $rootScope.$on('$stateChangeSuccess', () => {
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    if($auth.getPayload()) vm.profilePageId = $auth.getPayload().userId;
    vm.navIsOpen = false;
  });

}
