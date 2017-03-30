angular
.module('rentApp')
.controller('PaymentController', PaymentController);

PaymentController.$inject = ['$http', '$window', '$state', '$stateParams', 'Request'];
function PaymentController($http, $window, $state, $stateParams, Request) {
  const vm = this;
  let requester;
  const Stripe = $window.Stripe;
  const request = Request.get($stateParams, ()=>{
    requester = request.requester[0].id;
    const pricePerDay = request.item[0].price;
    console.log(pricePerDay);
    const days = request.numberOfDays;
    vm.card.amount = days * pricePerDay;
  });


  vm.card = {};
//  vm.payee = null;
//  vm.amount = null;
  vm.currency = 'gbp';
  vm.paymentSuccessful = false;

  vm.pay = function pay() {
    Stripe.card.createToken(vm.card, (status, response) => {
      console.log(status);
      console.log(vm.card);
      if(status === 200) {
        var data = {
          card: vm.card,
          token: response.id,
          payee: vm.payee,
          amount: vm.amount,
          currency: vm.currency
        };

        $http
          .post('/payment', data)
          .then((req, res) => {
            if(res.status === 200) {
              vm.paymentSuccessful = true;

            } else {
              vm.paymentSuccessful = false;
            }
          });
      }
    });

    request.paid = true;
    request.accepted = true;
    Request
    .delete({id: request.id})
    .$promise
    .then(()=>{
      $state.go('profile', {id: requester});
    });
  };

  vm.reset = function() {
    vm.card = {};
    vm.payee = '';
    vm.amount = null;
    vm.paymentSuccessful = false;
    vm.Form.$setPristine(true);
  };
}
