angular
  .module('rentApp')
  .directive('formErr', formErr);

function formErr(){
  const directive = {
    restrict: 'EA',
    replace: false,
    templateUrl: 'src/js/views/partials/_formvalidationrequired.html',
    scope: {
      form: '=',
      err: '=',
      mess: '@'
    }

  };
  return directive;
}
// A custom directive to DRY up our formvalidation in the HTML work in Progress Does not work ATM // SAM
