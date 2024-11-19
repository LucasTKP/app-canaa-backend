import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './app.controller';
import { FirebaseService } from './app.service';

describe('AppController', () => {
  let appController: NotificationsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [FirebaseService],
    }).compile();

    appController = app.get<NotificationsController>(NotificationsController);
  });

  describe('root', () => {
    it('Envia as notificações', () => {
      const result = appController.sendNotification({
        titulo: expect.any(String),
        descricao: expect.any(String),
      });
      expect(result).toContain('Notificação enviada:');
    });
  });
});
