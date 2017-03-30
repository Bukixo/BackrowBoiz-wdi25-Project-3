angular
.module('rentApp')
.controller('PaymentController', PaymentController);

PaymentController.$inject = ['$http', '$window', '$state', '$stateParams', 'Request'];
function PaymentController($http, $window, $state, $stateParams, Request) {
  const vm = this;
  let requester;
  const Stripe = $window.Stripe;

  vm.card = {};
  vm.currency = 'gbp';
  vm.paymentSuccessful = false;

  const request = Request.get($stateParams, ()=>{
    requester = request.requester[0].id;
    const pricePerDay = request.item[0].price;
    const days = request.numberOfDays;
    vm.card.amount = days * pricePerDay;
  });

  function paymentTransaction(data){
    $http
        .post('/api/payment', data)
        .then((req, res) => {
          if(res.status === 200) {
            vm.paymentSuccessful = true;

          } else {
            vm.paymentSuccessful = false;
          }
        });
  }

  function removePayedRequest(){
    request.paid = true;
    request.accepted = true;
    Request
    .delete({id: request.id})
    .$promise
    .then(()=>{
      $state.go('profile', {id: requester});
    });
  }

  vm.pay = function pay() {
    Stripe.card.createToken(vm.card, (status, response) => {
      const data = {
        card: vm.card,
        token: response.id,
        payee: vm.card.payee,
        amount: vm.card.amount,
        currency: vm.card.currency
      };
      paymentTransaction(data);
    });
    removePayedRequest();
  };

  vm.reset = function() {
    vm.card = {};
    vm.payee = '';
    vm.amount = null;
    vm.paymentSuccessful = false;
    vm.Form.$setPristine(true);
  };
}
