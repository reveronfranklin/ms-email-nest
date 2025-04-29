import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificacionEmailService } from './notificacion-email.service';
import { CreateNotificacionEmailDto } from './dto/create-notificacion-email.dto';
import { UpdateNotificacionEmailDto } from './dto/update-notificacion-email.dto';

@Controller('notificacion-email')
export class NotificacionEmailController {
  constructor(
    private readonly notificacionEmailService: NotificacionEmailService,
  ) {}

  @Post()
  create(@Body() createNotificacionEmailDto: CreateNotificacionEmailDto) {
    return this.notificacionEmailService.create(createNotificacionEmailDto);
  }

  @Get()
  findAll() {
    return this.notificacionEmailService.findAll();
  }
  @Get('obtener-emails-concatenados')
  obtenerEmailsConcatenados() {
    return this.notificacionEmailService.obtenerEmailsConcatenados();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificacionEmailService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificacionEmailDto: UpdateNotificacionEmailDto,
  ) {
    return this.notificacionEmailService.update(
      +id,
      updateNotificacionEmailDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificacionEmailService.remove(+id);
  }
}
