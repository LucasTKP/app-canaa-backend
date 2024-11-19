import { Module, ValidationPipe } from '@nestjs/common';
import { NotificationsController } from './app.controller';
import { FirebaseService } from './app.service';

@Module({
  imports: [],
  controllers: [NotificationsController],
  providers: [FirebaseService],
})
export class AppModule {}
