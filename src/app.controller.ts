import { Controller, Post, Body, ValidationPipe, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { CreateNotificationDto } from './models';
import { FirebaseService } from './app.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post('')
  @HttpCode(HttpStatus.OK) // Define explicitamente o código de status HTTP
  async sendNotification(
    @Body(new ValidationPipe()) notificationDto: CreateNotificationDto,
  ): Promise<{ status: string; message: string }> {
    try {
      const { titulo, descricao } = notificationDto;
      const response = await this.firebaseService.sendNotification(titulo, descricao);

      return {
        status: 'success',
        message: 'Notificação enviada com sucesso!',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: `Erro ao enviar notificação: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
