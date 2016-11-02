import * as angular from 'angular';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let message: MessageService;

  beforeEach(angular.mock.module('app', 'templates'));
  beforeEach(inject((messageService) => {
    message = messageService;
  }));

  describe('getMessage', () => {
    it('should be defined', () => {
      expect(message.getMessage).toBeDefined();
    });
  });
});
