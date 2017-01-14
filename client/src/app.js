import angular from 'angular'
angular.module('myOlympics', [])
.controller('sportsController', function($http) {
  $http.get('/sports').then((response) => {
    this.sports = response.data;
  });
});
