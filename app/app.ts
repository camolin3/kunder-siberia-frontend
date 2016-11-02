import 'angular';
import 'angular-ui-router';
import 'lodash';

import * as angular from 'angular';
import * as router from 'angular-ui-router';
import * as _ from 'lodash';
import { ALMOST_PI } from './config/constants';
import {
  MessageService
} from './common/services/index';
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
  .constant('_', _)
  .service('messageService', MessageService)
  .controller('homeController', HomeController);
