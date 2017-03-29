/* global Stripe */
angular
  .module('rentApp', ['ui.router', 'ngResource', 'ui.bootstrap', 'ngAnimate', 'satellizer', 'wu.masonry'])
  .config(function() {
    Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
  });
