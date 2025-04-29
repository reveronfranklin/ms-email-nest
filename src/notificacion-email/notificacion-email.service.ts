import { Injectable } from '@nestjs/common';
import { CreateNotificacionEmailDto } from './dto/create-notificacion-email.dto';
import { UpdateNotificacionEmailDto } from './dto/update-notificacion-email.dto';
import { AppNotificacionEmail } from './entities/notificacion-email.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotificacionEmailService {
  constructor(
    @InjectRepository(AppNotificacionEmail)
    private repository: Repository<AppNotificacionEmail>,
  ) {}

  async create(createNotificacionEmailDto: CreateNotificacionEmailDto) {
    return 'This action adds a new notificacionEmail';
  }

  async findAll() {
    const result = await this.repository.find({
      where: { Enable: true },
    });
    return result;
  }

  async obtenerEmailsConcatenados() {
    const arrayDeObjetos = await this.repository.find({
      where: { Enable: true },
    });

    const emails = arrayDeObjetos.map((objeto) => objeto.Email);
    return emails.join(',');
  }

  async findOne(id: number) {
    return `This action returns a #${id} notificacionEmail`;
  }

  async update(
    id: number,
    updateNotificacionEmailDto: UpdateNotificacionEmailDto,
  ) {
    return `This action updates a #${id} notificacionEmail`;
  }

  async remove(id: number) {
    return `This action removes a #${id} notificacionEmail`;
  }
}
