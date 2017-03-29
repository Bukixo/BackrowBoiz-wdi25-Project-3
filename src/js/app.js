angular
  .module('rentApp', ['ui.router', 'ngResource', 'ui.bootstrap', 'ngAnimate', 'satellizer'])
  .constant('API_URL', 'http://localhost:4000')
  .config(function() {
    Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
  });
