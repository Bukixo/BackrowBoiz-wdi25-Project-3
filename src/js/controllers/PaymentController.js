angular
.module('rentApp')
.controller('PaymentController', PaymentController);

PaymentController.$inject = ['$http', '$window'];
function PaymentController($http, $window) {
  var vm = this;

  const Stripe = $window.Stripe;

  vm.card = {};
  vm.payee = null;
  vm.amount = null;
  vm.currency = 'gbp';
  vm.paymentSuccessful = false;

  vm.pay = function pay() {
    Stripe.card.createToken(vm.card, (status, response) => {
      if(status === 200) {
        var data = {
          card: vm.card,
          token: response.id,
          amount: vm.amount,
          currency: vm.currency,
          payee: vm.payee
        };

        $http
          .post('/payment', data)
          .then((res) => {
            if(res.status === 200) {
              vm.paymentSuccessful = true;
            } else {
              vm.paymentSuccessful = false;
            }
          });
      }
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
