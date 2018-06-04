import angular from 'angular';
import './root.component.js';

angular
.module('single-spa-app')
.config(($stateProvider, $locationProvider) => {

  $locationProvider.html5Mode({
    enabled: true, 
    requireBase: false, 
  });

  $stateProvider
  .state('root', {
    url: '/angular1',
    template: '<root />',
  })
});