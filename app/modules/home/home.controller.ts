import { MessageService } from '../../common/services';

export class HomeController {
  constructor(
    private greeting: string
  ) {}

  public static resolve: any = {
    greeting: ['messageService', (message: MessageService) => message.getMessage()]
  };
}
