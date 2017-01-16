import angular from 'angular'
import 'angular-ui-router'
angular.module('myOlympics', ['ui.router'])

.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/sports');

  $stateProvider
    .state('sports', {
      url: '/sports',
      templateUrl: 'modules/sports/sports-nav.html',
      resolve: {
        sportsService: function($http) {
          return $http.get('/sports');
        }
      },
      controller: function(sportsService) {
        this.sports = sportsService.data;
      },
      controllerAs: 'sportsCtrl'
    })
    .state('sports.medals', {
      url: '/:sportName',
      templateUrl: 'modules/sports/sports-medals.html',
      controller: function(sportService) {
        this.sport = sportService.data;
      },
      controllerAs: 'sportCtrl',
      resolve: {
        sportService: ['$http','$stateParams', function($http, $stateParams) {
          console.log($stateParams);
            return $http.get('/sports/' + $stateParams.sportName);
          }]
        }
      });
});
