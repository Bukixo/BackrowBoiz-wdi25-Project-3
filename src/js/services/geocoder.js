angular
  .module('rentApp')
  .service('geoCoder', GeoCoder);

GeoCoder.$inject = ['$http'];
function GeoCoder($http){
  this.getLocation = function getLocation(location){
    return $http
      .get('/api/location', {params: {location}})
      .then((data)=> {

        const latlng = data.data.results[0].geometry.location || 'North Korea';
        return latlng;
      });
  };

}
