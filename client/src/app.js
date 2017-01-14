import angular from 'angular'
angular.module('myOlympics', [])
.controller('sportsController', function() {
  this.sports = ['Gymnastics', 'Acrobatics'];
});
