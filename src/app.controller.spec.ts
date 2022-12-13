import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './external/app.controller';
import { AppService } from './external/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getNotifications()).toBe('Hello World!');
    });
  });
});
