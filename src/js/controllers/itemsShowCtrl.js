/* global google*/
angular
  .module('rentApp')
  .controller('itemShowCtrl', itemShowCtrl)
  .controller('itemEditCtrl', itemEditCtrl);


itemShowCtrl.$inject = ['Item', '$stateParams', '$state', '$scope'];
function itemShowCtrl(Item, $stateParams, $state, $scope){
  const vm = this;
  vm.range = {};
  //vm.range.radius = 7;
  // vm.newComment = {};
  vm.item = Item.get($stateParams);
  vm.delete = itemsDelete;
  initMap();
  function itemsDelete() {
    vm.item
      .$remove()
      .then(() => $state.go('itemsIndex'));
  }

//<------------GOOGLE MAPS ------------------->

  function initMap() {
     // Creates The actual Map
    const map = new google.maps.Map(document.getElementById('maps'), {
      center: { lat: 51.5073509, lng: -0.12775829999998223 },
      zoom: 10,
      scrollwheel: false
    });
    //marker puts marker on the screen with a animation
    const locationOfItem = { lat: 51.5073509, lng: -0.12775829999998223 }
    const marker = new google.maps.Marker({
      animation: google.maps.Animation.BOUNCE,
      position: locationOfItem,
      draggable: true,
      map: map
    });
    function clearMap(cityArr, cityCircle){
      if(!cityArr.length===1 ){
        cityArr.setMap(null);
      } else{
        console.log(cityArr[0]);
      }
      // if(cityCircle){
      //    cityCircle.setMap(null);
      //  }else {
      //    createRadius();
      //  }
    }
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
        center: locationOfItem,
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
