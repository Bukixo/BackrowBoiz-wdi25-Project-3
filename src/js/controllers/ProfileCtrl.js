//for editing and deleting profile
angular
  .module('rentApp')
  .controller('ProfileCtrl', ProfileCtrl)
  .controller('EditCtrl', EditCtrl);

ProfileCtrl.$inject = ['User','$stateParams', '$http', '$state', '$auth'];
function ProfileCtrl(User, $stateParams, $http, $state, $auth){
  const vm = this;


//defines all functions that is going be interact directly with the UI
  // vm.open = openEditModal;
// Grabs Request info from back end
  vm.user = User.get($stateParams); // vm.user is the current user's userpage rendering

  vm.incomingRequests = [];
  vm.activeRequests = [];
  vm.myRequests = [];
  vm.accepted = [];

  $http.get('/api/profile')
  .then((response)=> {
    //console.log(response);
    vm.activeUser = response.data.user; // ActiveUser is the one being logged in
    vm.pending = response.data.pending;
    vm.requested = response.data.requested;
    console.log(vm.requested);
  //  vm.myRequest= if(vm.requested)

    vm.requested.forEach((request)=>{
      if(request.requester[0].id === vm.user.id){
        vm.myRequests.push(request);
      } else{
        console.log(request.requester[0].id);
      }
    });

    vm.requested.forEach((request)=>{// checks if the request item's owner is the same as the user rendering and makes sure the requester is not the same as the actual user
      if(request.item[0].createdBy === vm.user.id && request.requester[0].id !== vm.user.id && request.accepted === false){
        vm.incomingRequests.push(request);
      //  if the first block passes it checks if the boolean accepted and determines if it's your request who got accepted or if you accepted someone elses
      }else if(request.accepted === true && vm.user.id !== request.requester[0].id){
        vm.activeRequests.push(request);
      } else if(request.accepted === true && vm.user.id === request.requester[0].id){
        vm.accepted.push(request);
      }


    });



    vm.mine = vm.activeUser.id === vm.user.id; // Checks if the user is the same as the logged in
    vm.accept = acceptRequest;
    function acceptRequest(request){
      request.accepted = true;
      request.requester = request.requester[0].id;
      request.item = request.item[0].id;
      console.log(request);
      $http
      .put(`/api/request/${request.id}`,request)
      .then(()=> $state.go('profile', $stateParams));

      vm.activeRequests.push(request);
      const index = vm.incomingRequests.indexOf(request);
      vm.incomingRequests.splice(index, 1);
    }

  });
  vm.decline = declineRequest;
  function declineRequest(request){
    $http
    .delete(`/api/request/decline/${request.id}`)
    .then(()=>{
      const index = vm.incomingRequests.indexOf(request);
      vm.incomingRequests.splice(index, 1);
    });

  }


  // Opens the Modal assign controller and template to our edit
  // function openEditModal(){
  //   $uibModal.open({
  //     templateUrl: 'js/views/users/edit.html',
  //     controller: 'ProfileEditModalCtrl as profile',
  //     resolve: {
  //       user: ()=> {
  //         return vm.user;
  //       }
  //     }
  //   });
  // }
  vm.delete = profileDelete;
  function profileDelete() {
    $auth.logout();
    vm.user
      .$remove()
      .then(() => $state.go('itemsIndex'));
  }
}

EditCtrl.$inject = ['User', '$state', '$stateParams'];
function EditCtrl(User, $state, $stateParams){
  //gets the user from the profile passed in

  const vm = this;

  vm.user = User.get($stateParams);

//hooks up all the UI functionality
  // vm.close = closeEditModal;
  // vm.update= updateUser;

//closes the Modal
  // function closeEditModal(){
  //   $uibModalInstance.close();
  // }
//updates the user
  function updateUser(){
    // if(vm.editProfileForm){
    vm.user
    .$update()
    .then(()=> {
      // closeEditModal();
      $state.go('itemsIndex', $stateParams);
    });
  }
  vm.update= updateUser;
}
