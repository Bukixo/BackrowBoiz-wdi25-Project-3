angular
  .module('rentApp')
  .controller( 'MainCtrl', MainCtrl)
  .controller( 'IndexCtrl', IndexCtrl);

MainCtrl.$inject = ['$state'];
function MainCtrl($state) {
  const vm = this;
}
