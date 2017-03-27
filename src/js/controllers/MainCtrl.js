angular
  .module('rentApp')
  .controller( 'MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth', 'filterFilter', 'orderByFilter', '$scope'];
function MainCtrl($rootScope, $state, $auth, filterFilter, orderByFilter, $scope) {
  const vm = this;

  function filterItems(){
    const params = { name: vm.q };
    vm.filtered = filterFilter(vm.all, params);
    vm.filtered = orderByFilter(vm.filtered, vm.sort);
  }

  $scope.$watchGroup([
    ()=> vm.q,
    ()=> vm.sort
  ],filterItems);

  vm.isAuthenticated = $auth.isAuthenticated;

  if($auth.getPayload()) vm.profilePageId = $auth.getPayload().userId;

  console.log(vm.profilePageId);

  vm.logout = logout;

  function logout() {
    $auth.logout(); //remove the token
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
  });

}
