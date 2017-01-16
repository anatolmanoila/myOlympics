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
    }).
    state('sports.medals', {
      url: '/:sportName',
      templateUrl: 'modules/sports/sports-medals.html',
      resolve: {
        sportService: function($q) {
          return $q((resolve, reject) => {
            let sport = {
              "name": "Mountain Biking",
              "goldMedals": [{
                "division": "Men's Sprint",
                "country": "RO",
                "year": 2016
              }, {
                "division": "Men\'s line",
                "country": "MD",
                "year": 2016
            }]
          };
          resolve( { data: sport } );
          });
        }
      },
      controller: function(sportService) {
        this.sport = sportService.data;
      },
      controllerAs: 'sportCtrl'
    });
});
