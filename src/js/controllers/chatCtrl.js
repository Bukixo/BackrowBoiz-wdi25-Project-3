angular
  .module('rentApp')
  .controller('ChatCtrl', ChatCtrl);


ChatCtrl.$inject = ['$auth', 'User', '$http', '$scope'];
function ChatCtrl($auth, User, $http, $scope){
  const vm = this;
  let user;
  //const socket = io('http://localhost:4001');
  const socket = io(location.hostname+':4001');
  vm.messages = [];
  const connectedUser =  {};
  vm.allUsers = [];

  if($auth.getPayload())$http.get(`/api/users/${$auth.getPayload().userId}`)
 .then((data)=> {
   user = data.data;
 });



  vm.send = sendMsg;
  function sendMsg(){
    if($auth.getPayload())$http.get(`/api/users/${$auth.getPayload().userId}`)
   .then((data)=> {
     user = data.data;
   });
    if(vm.socketMessage.message === false) return console.log('he');
    vm.socketMessage.socket = socket.id;
    vm.socketMessage.user = user.username;
    socket.emit('broadcast',vm.socketMessage);// should send to all users execept sender
    //socket.emit('chat message',vm.socketMessage); // sends to all connected users
  //  socket.to('iXzG4hbu2xO10Ek6AAAE').emit(vm.socketMessage); // sends to specifi ID
  //  vm.messages.push(vm.socketMessage);
    console.log(vm.socketMessage, 'sent');
    vm.socketMessage = {};
    return false;
  }
  // sending to individual socketid (private message)

  socket.on('chat message', function(msg){ // listens for chat messages
    console.log(msg, 'recived');
    vm.messages.push(msg);
  //  alert('you have recived a msg');
  });
  socket.on('broadcast', function(msg){ // listen for broadcasts
    console.log(msg, 'recived broadcast');
    vm.messages.push(msg);
  });

  socket.on('announcements', function(data) { // listens for announcments
    console.log(data);
  });

  socket.on('stats', (data)=>{
    if($auth.getPayload())$http.get(`/api/users/${$auth.getPayload().userId}`)
   .then((userdata)=> {
     user = userdata.data;
   });

    data.id = socket;

    connectedUser.user = user.username;
    connectedUser.clientId = socket.id;

    socket.emit('userConnect', connectedUser);

  });
  socket.on('activeUsers', (users)=>{
    users.forEach((user)=>{
      if(user.clientId !== vm.allUsers.forEach((user)=> user.clientId)){
        console.log('works');
        user.num = Math.random()*10;

        vm.allUsers.push(user);
      }
    });
    console.log(vm.allUsers);
  });


  $scope.$watch(()=>vm.messages,()=>{
    vm.messages;
  });
}
