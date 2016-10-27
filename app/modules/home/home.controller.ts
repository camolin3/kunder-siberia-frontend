import { MessageService } from '../../common/services';

export class HomeController {
  constructor(
    private greeting: string,
    private ALMOST_PI: number
  ) {}

  public static resolve: any = {
    greeting: ['messageService', (message: MessageService) => message.getMessage()]
  };
}
