//for editing and deleting profile
angular
  .module('rentApp')
  .controller('ProfileCtrl', ProfileCtrl)
  .controller('ProfileEditModalCtrl', EditCtrl);

ProfileCtrl.$inject = ['User','$stateParams','$uibModal', '$http', '$state', '$auth'];
function ProfileCtrl(User, $stateParams, $uibModal, $http, $state, $auth){
  const vm = this;
//defines all functions that is going be interact directly with the UI
  vm.open = openEditModal;
// Grabs Request info from back end
  vm.user = User.get($stateParams);
  vm.incomingRequests = [];
  vm.activeRequests = [];
  $http.get('/api/profile')
  .then((response)=> {
    console.log(response);
    vm.activeUser = response.data.user; // den som är inloggad
    vm.pending = response.data.pending;
    vm.requested = response.data.requested;

  //  vm.myRequest= if(vm.requested)
    vm.requested.forEach((request)=>{// vill räkna ut ifall requesten är min, genom att jämföra createdBy.id med user.id isåfall visa den
      if(request.item[0].createdBy === vm.user.id && request.requester[0].id !== vm.user.id){
        vm.incomingRequests.push(request);
        console.log(request);
      }
    });

    vm.mine = vm.activeUser.id === vm.user.id; // berkänar om den inloggade.id är samma som profilens .id
    vm.accept =acceptRequest;
    function acceptRequest(request){
      vm.activeRequests.push(request);
      const index = vm.incomingRequests.indexOf(request);
      vm.incomingRequests.splice(index, 1);
    }

  });
  vm.decline = declineRequest;
  function declineRequest(request){
    $http
    .delete(`/api/request/${request.id}`)
    .then(()=>{
      const index = vm.incomingRequests.indexOf(request);
      vm.incomingRequests.splice(index, 1);
    });
    console.log(request);
  }

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
