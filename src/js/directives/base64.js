//handling on the client side - turns uploaded image into a string and sends to the server

angular
.module('rentApp')
.directive('base64', base64);

function base64(){

  const fileReader = new FileReader();

  return{
    restrict: 'A',
    require: 'ngModel',
    link($scope, element, attrs, ngModel) {

      fileReader.onload = function fileLoaded() {
        ngModel.$setViewValue(fileReader.result);
      };

      element.on('change', (e) => {
        const file = (e.target.files || e.dataTransfer.files)[0];
        fileReader.readAsDataURL(file);
      });
    }
  };
}
