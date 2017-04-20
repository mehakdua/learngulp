angular
  .module('brainvizApp', [
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
    .state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit       
        });
  }]);
 