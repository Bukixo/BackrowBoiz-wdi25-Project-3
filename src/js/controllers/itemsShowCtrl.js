/* global google, marker*/
angular
  .module('rentApp')
  .controller('itemShowCtrl', itemShowCtrl)
  .controller('itemEditCtrl', itemEditCtrl);

itemShowCtrl.$inject = ['Item', '$stateParams', '$state', '$scope', '$http', 'Comments', 'geoCoder', '$auth', 'mapStyles'];
function itemShowCtrl(Item, $stateParams, $state, $scope, $http, Comments, geoCoder, $auth, mapStyles){
  console.log(mapStyles.styles);
  const vm = this;
  vm.range = {};

  function sendRequest(){
    vm.request.paid = false;
    vm.request.accepted = false;
    vm.request.item =  vm.item.id;
    vm.request.requester = $auth.getPayload().userId;
    console.log(vm.request);
    $http
      .post('/api/request', vm.request)
      .then(()=>{
        $state.go('itemsIndex');
      });
  }
  vm.sendRequest = sendRequest;

  vm.newComment = {};
  Item.get($stateParams,(data)=>{
    const location = data.createdBy.location;
    vm.item = data;
    getLocationOfUser(location);
  });
  vm.delete = itemsDelete;
  function itemsDelete() {
    vm.item
      .$remove()
      .then(() => $state.go('itemsIndex'));
  }

//<------------ COMMENTS ------------------->>>
  vm.addComment = addComment;
  function addComment(){
    Comments
    .save( {itemId: vm.item.id}, vm.newComment)
    .$promise
    .then((comment)=>{
      vm.item.comments.push(comment);
      vm.newComment = {};
    });
  }
  vm.deleteComment = deleteComment;
  function deleteComment(comment){
    Comments
    .delete({itemId: vm.item.id, id: comment.id})
    .$promise
    .then(()=>{
      const index = vm.item.comments.indexOf(comment);
      vm.item.comments.splice(index, 1);
    });
  }



//<------------GOOGLE MAPS ------------------->
  function getLocationOfUser(location){
    geoCoder.getLocation(location)
    .then((data)=>{
      const latlng = data;
      initMap(latlng);
    });
  }
  function initMap(latlng) {
     // Creates The actual Map
    const map = new google.maps.Map(document.getElementById('maps'), {
      center: latlng,
      zoom: 10,
<<<<<<< HEAD
      scrollwheel: false,
      styles: mapStyles.styles
=======
      scrollwheel: false
>>>>>>> development
    });
    //marker puts marker on the screen with a animation

    const marker = new google.maps.Marker({
      animation: google.maps.Animation.BOUNCE,
      position: latlng,
      draggable: true,
      map: map
    });

    const cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#AA0000',
      fillOpacity: 0.35,
      map: map,
      center: latlng,
      radius: 5000
    });

    function editRadius(radius){
      cityCircle.setRadius(radius*1000);
    }

    $scope.$watch(()=> vm.range.radius, ()=> {
      const radius = vm.range.radius;
      editRadius(radius);
    });

  }



}


//<----------------ITEM EDIT CTRL----------------------------->

itemEditCtrl.$inject = ['Item', '$stateParams', '$state'];
function itemEditCtrl(Item, $stateParams, $state) {
  const vm = this;

  vm.item = Item.get($stateParams);

  function itemsUpdate() {
    // The vm.item gives us the full object user so I had to reassign the createdBy to an single Object.id inorder for the form to work because it only takes a Singledatavalue
    vm.item.createdBy = vm.item.createdBy.id;
    console.log(vm.item);
    vm.item
      .$update()
      .then(() => $state.go('itemsShow', $stateParams));
  }

  vm.update = itemsUpdate;
}
