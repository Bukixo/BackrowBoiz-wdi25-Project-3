//for editing and deleting profile
angular
  .module('rentApp')
  .controller('ProfileCtrl', ProfileCtrl)
  .controller('EditCtrl', EditCtrl);

ProfileCtrl.$inject = ['User','$stateParams', '$http', '$state', '$auth', 'Request', 'Item'];
function ProfileCtrl(User, $stateParams, $http, $state, $auth, Request, Item){
  const vm = this;

  vm.allUserItems = [];
  vm.incomingRequests = [];
  vm.activeRequests = [];
  vm.myRequests = [];
  vm.accepted = [];


  function getUsersItems(){
    Item.query()
    .$promise
    .then((items)=>{
      items.forEach((item)=>{
        if(item.createdBy.id === vm.user.id){
          vm.allUserItems.push(item);
        }
      });
    });
  }

//defines all functions that is going be interact directly with the UI
// Grabs Request info from back end
  vm.user = User.get($stateParams, ()=>{
    console.log(vm.user);
    if(vm.user.githubId && !vm.user.facebookId && !vm.user.instagramId){
      vm.user.imageSRC = vm.user.image;
    }
    if(vm.user.instagramId && !vm.user.facebookId && !vm.user.githubId){
      vm.user.imageSRC = vm.user.image;
    }
    if(vm.user.facebookId) vm.user.imageSRC = vm.user.image;
    getUsersItems();
  }); // vm.user is the current user's userpage rendering


  $http.get('/api/profile')
  .then((response)=> {
    vm.activeUser = response.data.user; // ActiveUser is the one being logged in
    vm.pending = response.data.pending;
    vm.requested = response.data.requested;
    vm.requested.forEach((request)=>{
      if(request.requester[0].id === vm.user.id){
        vm.myRequests.push(request);
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


     // Checks if the user is the same as the logged in
    vm.accept = acceptRequest;
    vm.decline = declineRequest;
    vm.delete = profileDelete;
    vm.mine = vm.activeUser.id === vm.user.id;
    function acceptRequest(request){
      request.accepted = true;
      request.requester = request.requester[0].id;
      request.item = request.item[0].id;
      $http
      .put(`/api/request/${request.id}`,request)
      .then(()=> $state.go('profile', $stateParams));

      vm.activeRequests.push(request);
      const index = vm.incomingRequests.indexOf(request);
      vm.incomingRequests.splice(index, 1);
    }
  });

  function declineRequest(request){
    Request
    .delete({id: request.id})
    .$promise
    .then(()=>{
      const index = vm.incomingRequests.indexOf(request);
      vm.incomingRequests.splice(index, 1);
    });

  }


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

  vm.update= updateUser;
  vm.user = User.get($stateParams);
//updates the user
  function updateUser(){
    vm.user
    .$update()
    .then(()=> {
      $state.go('profile', $stateParams);
    });
  }

}
