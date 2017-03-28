angular
  .module('rentApp')
  .controller( 'MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth', 'filterFilter', 'orderByFilter'];
function MainCtrl($rootScope, $state, $auth, filterFilter, orderByFilter) {
  const vm = this;

  //const socket = io.connect('http://localhost:4001');
  const socket = io('http://localhost:4001');
  socket.emit('yo');
  // vm.send = sendMsg;
  // function sendMsg(){
  //   socket.emit('chat message', document.getElementById('m').value);
  //   document.getElementById('m').value ='';
  //   console.log('works');
  // }
  // socket.on('chat message', function(msg){
  //   console.log(msg);
  //   var mess = document.createElement('div');
  //   mess.innerHTML = msg;
  //   console.log(msg);
  // });
  // socket.on('connect_error', function(err){
  //   console.log(err);
  // });
  //
  // socket.on('connection', function(socket){
  //   console.log('works');
  //   socket.broadcast.emit('hi');
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
  });

}
