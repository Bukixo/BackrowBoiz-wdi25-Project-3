const request = require('request-promise');

function getLocation(req, res){
  //const url = 'https://maps.googleapis.com/maps/api/geocode/json?';
  const location = req.query.location || 'North Korea'; 
  request({
    method: 'GET',
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyAEi_tighHwZ4dswlQz7CWXWxpHZ17LzoM`,
    json: true
  })
  .then((data)=>{
    res.status(200).json(data);
  })
  .then((err)=>{
    res.status(500).json(err);
  });
}

module.exports = { getLocation};
