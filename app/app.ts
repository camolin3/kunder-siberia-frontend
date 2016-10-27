import * as angular from 'angular';
import 'angular-ui-router';
import * as router from 'angular-ui-router';
import { ALMOST_PI } from './config/constants';
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
      $stateProvider: router.IStateProvider,
      $urlRouterProvider: router.IUrlRouterProvider
    ) => {
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'modules/home/home.html',
          controller: 'homeController',
          controllerAs: 'home',
          resolve: HomeController.resolve
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
        $log.log(e);
      });
    }
  ])
  .constant('ALMOST_PI', ALMOST_PI)
  .service('messageService', MessageService)
  .controller('homeController', HomeController);
