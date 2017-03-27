//for editing and deleting profile

angular
  .module('rentApp')
  .controller('ProfileCtrl', ProfileCtrl)
  .controller('ProfileEditModalCtrl', EditCtrl);

ProfileCtrl.$inject = ['User','$stateParams','$uibModal', '$http', '$state', '$auth'];
function ProfileCtrl(User, $stateParams, $uibModal, $http, $state, $auth){
  const vm = this;
  //Grabs the User factory and assign the one user with the ID equal to the url ID to the user variable
  vm.user = User.get($stateParams);
//defines all functions that is going be interact directly with the UI
  vm.open = openEditModal;
// Grabs Request info from back end
  function giveMeTheFuckingData(){
    $http.get('/api/profile').then((data)=>{
      console.log(data);
    });
  }

  giveMeTheFuckingData();

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
  vm.delete = profileDelete;
  function profileDelete() {
    $auth.logout();
    vm.user
      .$remove()
      .then(() => $state.go('itemsIndex'));
      // vm.logout = logout;
      //
      // function logout() {
      //    //remove the token
      //   location.reload();
      //   $state.go('login');
      // }


  }
}

EditCtrl.$inject = ['user', '$state','$uibModalInstance', '$stateParams' ];
function EditCtrl(user, $state, $uibModalInstance, $stateParams){
  //gets the user from the profile passed in
  const vm = this;
  vm.user = user;

//hooks up all the UI functionality
  vm.close = closeEditModal;
  vm.update= updateUser;

//closes the Modal
  function closeEditModal(){
    $uibModalInstance.close();
  }
//updates the user
  function updateUser(){
    if(vm.editProfileForm.$valid){
      vm.user
      .$update()
      .then(()=> {
        closeEditModal();
        $state.go('itemsIndex');
      });
    }
  }
}
