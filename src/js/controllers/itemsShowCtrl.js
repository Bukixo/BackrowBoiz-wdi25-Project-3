/* global google*/
angular
  .module('rentApp')
  .controller('itemShowCtrl', itemShowCtrl)
  .controller('itemEditCtrl', itemEditCtrl);


itemShowCtrl.$inject = ['Item', '$stateParams', '$state', '$scope', '$http', 'Comments'];
function itemShowCtrl(Item, $stateParams, $state, $scope, $http, Comments){
  const vm = this;
  vm.range = {};

  vm.newComment = {};
  Item.get($stateParams,(data)=>{
    vm.item = data;
    getLocationOfUser(data);
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
  function getLocationOfUser(data){
    $http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${data.createdBy.location}&key=AIzaSyAEi_tighHwZ4dswlQz7CWXWxpHZ17LzoM`)
  .then((data)=>{
    const latlng = data.data.results[0].geometry.location;
    initMap(latlng);
  });
  }
  function initMap(latlng) {
     // Creates The actual Map
    const map = new google.maps.Map(document.getElementById('maps'), {
      center: latlng,
      zoom: 10,
      scrollwheel: false
    });
    //marker puts marker on the screen with a animation

    const marker = new google.maps.Marker({
      animation: google.maps.Animation.BOUNCE,
      position: latlng,
      draggable: true,
      map: map
    });
    function clearMap(cityArr, cityCircle){
      if(!cityArr.length===1 ){
        cityArr.setMap(null);
      }
    }
      // if(cityCircle){
      //    cityCircle.setMap(null);
      //  }else {
      //    createRadius();
      //  }

    let noOfCircle = 0;
    //const radius = vm.range.radius * 1000;
    function createRadius(radius){
      noOfCircle++;
      const cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#AA0000',
        fillOpacity: 0.35,
        map: map,
        center: latlng,
        radius: radius * 1000
      });
      const cityArr = [];
      cityArr.push(cityCircle);
      clearMap(cityArr, cityCircle);
      // if(noOfCircle > 2){
      //   cityCircle.setMap(null);
      // }
    }

    $scope.$watch(()=> vm.range.radius, ()=> {
      const radius = vm.range.radius;
      //console.log(radius);
      createRadius(radius);
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
