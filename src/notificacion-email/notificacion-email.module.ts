import { Module } from '@nestjs/common';
import { NotificacionEmailService } from './notificacion-email.service';
import { NotificacionEmailController } from './notificacion-email.controller';

import { AppNotificacionEmail } from './entities/notificacion-email.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AppNotificacionEmail])],
  controllers: [NotificacionEmailController],
  providers: [NotificacionEmailService],
  exports: [NotificacionEmailService],
})
export class NotificacionEmailModule {}
