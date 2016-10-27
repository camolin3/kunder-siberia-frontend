import * as angular from 'angular';
import {
  MessageService
} from './common/services';
import {
  HomeController
} from './modules/home/home.controller';

angular
  .module('app', [
    'ui.router',
  ])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    (
      $stateProvider,
      $urlRouterProvider
    ) => {
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'modules/home/home.html',
          controller: 'homeController',
          controllerAs: 'home'
        });
    }
  ])
  .run([
    '$log',
    '$rootScope',
    (
      $log,
      $rootScope
    ) => {
      $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, e) => {
        $log(e);
      });
    }
  ])
  .service('messageService', MessageService)
  .controller('homeController', HomeController);
