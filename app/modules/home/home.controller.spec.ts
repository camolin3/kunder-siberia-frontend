import * as angular from 'angular';
import * as _ from 'lodash';
import { HomeController } from './home.controller';

describe('HomeController', () => {
  let home: HomeController;
  let _: _.LoDashStatic;
  let $q: angular.IQService;
  let $rootScope: angular.IRootScopeService;

  beforeEach(angular.mock.module('app', 'templates'));
  beforeEach(inject(($controller, $injector: angular.auto.IInjectorService) => {
    _ = $injector.get<_.LoDashStatic>('_');
    $q = $injector.get<angular.IQService>('$q');
    $rootScope = $injector.get<angular.IRootScopeService>('$rootScope');

    const resolve = _.mapValues(HomeController.resolve, (annotatedFunct, key) => {
      return $injector.invoke(annotatedFunct);
    });
    $q.all(resolve)
      .then((dep) => {
        home = $controller('homeController', dep);
      });
    $rootScope.$digest();
  }));

  it('should have some variables defined', () => {
    expect(home['greeting']).toMatch('SIBERIA');
  });
});
