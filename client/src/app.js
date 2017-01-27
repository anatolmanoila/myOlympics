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
      controller: function(sportsService, $location) {
        this.sports = sportsService.data;

        this.isActive = function(sport) {
          let pathRegexp = /sports\/(\w+)/;
          let match = pathRegexp.exec($location.path());
          if(match === null || match.length === 0) return false;
          let selectedSportName = match[1];
          return sport === selectedSportName;
        };
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
            return $http.get('/sports/' + $stateParams.sportName);
          }]
        }
      })
      .state('sports.new', {
        url: '/:sportName/medal/new',
        templateUrl: 'modules/sports/new-medal.html',
        controller: function($stateParams, $state, $http) {
          this.sportName = $stateParams.sportName;

          this.saveMedal = function(medal) {
            $http({method: 'POST', url: '/sports/' + $stateParams.sportName + '/medals',
                  data: {medal}} ).then(function() {
                    $state.go('sports.medals', { sportName: $stateParams.sportName });
                  });
          };

        },
        controllerAs: 'newMedalCtrl'
      });
});
