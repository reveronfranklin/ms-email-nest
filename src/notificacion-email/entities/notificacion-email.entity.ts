import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('AppNotificacionEmail')
export class AppNotificacionEmail {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column()
  Email: string;
  @Column({ default: true })
  Enable: boolean;
}
