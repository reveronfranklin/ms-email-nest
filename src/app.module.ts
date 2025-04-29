import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { FileDownloadModule } from './file-download/file-download.module';
import { TaskService } from './task.service';
import { NotificacionEmailModule } from './notificacion-email/notificacion-email.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EmailModule,
    FileDownloadModule,
    NotificacionEmailModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '172.28.107.19\\FSVEMCYN03D',
      port: 50062,
      username: 'userweb',
      password: 'userweb2003',
      database: 'Maestros',
      autoLoadEntities: true,
      synchronize: false,
      options: {
        encrypt: false, // Intenta con true y false
        trustServerCertificate: true, // Intenta con true (solo para desarrollo/pruebas si es necesario) y false para producción
        // Puedes intentar especificar un protocolo TLS mínimo si el controlador lo permite
        // Ejemplo (puede no ser directamente soportado por tedious):
        // tls: { minVersion: 'TLSv1.2' },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TaskService],
})
export class AppModule {}
