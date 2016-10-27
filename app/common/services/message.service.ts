import * as angular from 'angular';

export class MessageService {
  constructor(
    private $q: angular.IQService
  ) {}

  getMessage(): angular.IPromise<string> {
    return this.$q.when('This is SIBERIA!');
  }
}
