//for editing and deleting profile

angular
  .module('rentApp')
  .controller('ProfileCtrl', ProfileCtrl)
  .controller('ProfileEditModalCtrl', EditCtrl);

ProfileCtrl.$inject = ['User','$stateParams','$uibModal'];
function ProfileCtrl(User, $stateParams, $uibModal){
  const vm = this;
  //Grabs the User factory and assign the one user with the ID equal to the url ID to the user variable
  vm.user = User.get($stateParams);
//defines all functions that is going be interact directly with the UI
  vm.open = openEditModal;

  // Opens the Modal assign controller and template to our edit
  function openEditModal(){
    $uibModal.open({
      templateUrl: 'js/views/users/edit.html',
      controller: 'ProfileEditModalCtrl as profile',
      resolve: {
        user: ()=> {
          return vm.user;
        }
      }
    });

  }

}

EditCtrl.$inject = ['User', '$state','$uibModalInstance', '$stateParams' ];
function EditCtrl(User, $state, $uibModalInstance, $stateParams){
  const vm = this;
  vm.user = User.get($stateParams);


  vm.close = closeEditModal;
  vm.update= updateUser;


  function closeEditModal(){
    $uibModalInstance.close();
  }

  function updateUser(){
    if(vm.editProfileForm.$valid){
      console.log('skd',vm.user.password);
      vm.user
      .$update()
      .then(()=> {
        closeEditModal();
        $state.go('itemsIndex');
      });
    }
  }
}
