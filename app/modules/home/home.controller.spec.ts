import 'angular';
import 'angular-mocks';

import * as angular from 'angular';
import * as mocks from 'angular-mocks';
import { HomeController } from './home.controller';

describe('HomeController', () => {
  let home: HomeController;

  beforeEach(angular.mock.module('app'));
  beforeEach(inject(($controller) => {
    home = $controller('homeController', {
      greeting: 'hola mundo'
    });
  }));

  it('should have some variables defined', () => {
    expect(home['greeting']).toMatch('hola mundo');
  });
});
