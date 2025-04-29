import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'EMAIL', schema: 'dbo' })
export class EmailEntity {
  @PrimaryGeneratedColumn({
    name: 'ID',
    type: 'numeric',
  })
  id: number;

  @Column({
    name: 'NAME',
    type: 'nvarchar',
    length: 50,
    default: '',
    nullable: true,
  })
  name: string;

  @Column({
    name: 'PATH',
    type: 'nvarchar',
    length: 120,
    default: '',
    nullable: true,
  })
  path: string;

  @Column({
    name: 'email',
    type: 'nvarchar',
    length: 250,
    default: '',
    nullable: true,
  })
  email: string;

  @Column({
    name: 'SUBJECT',
    type: 'nvarchar',
    length: 250,
    default: '',
    nullable: true,
  })
  subject: string;

  @Column({ name: 'texto', type: 'text', default: '', nullable: true })
  texto: string;

  @Column({
    name: 'depurar',
    type: 'char',
    length: 1,
    default: '',
    nullable: true,
  })
  depurar: string;

  @Column({ name: 'copia', type: 'text', default: '', nullable: true })
  copia: string;

  @Column({ name: 'copia_oculta', type: 'text', default: '', nullable: true })
  copiaOculta: string;

  @Column({
    name: 'fecha_creado',
    type: 'smalldatetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  fechaCreado: Date;

  @Column({ name: 'hora_creado', type: 'char', length: 12, nullable: true })
  horaCreado: string;

  @Column({ name: 'fecha_envio', type: 'smalldatetime', nullable: true })
  fechaEnvio: Date;

  @Column({ name: 'hora_envio', type: 'char', length: 12, nullable: true })
  horaEnvio: string;

  @Column({ name: 'id_carta', type: 'smallint', default: 0, nullable: true })
  idCarta: number;

  @Column({ name: 'Id_File', type: 'char', length: 20, nullable: true })
  idFile: string;

  @Column({ name: 'Password', type: 'char', length: 20, nullable: true })
  password: string;

  @Column({ name: 'Nsf_File', type: 'char', length: 20, nullable: true })
  nsfFile: string;

  @Column({ name: 'COD_CLIENTE', type: 'char', length: 10, nullable: true })
  codCliente: string;

  @Column({
    name: 'Batch',
    type: 'numeric',
    precision: 18,
    scale: 0,
    nullable: true,
  })
  batch: number;

  @Column({
    name: 'TipoBody',
    type: 'varchar',
    length: 10,
    default: 'Text',
    nullable: true,
  })
  tipoBody: string;

  @Column({ name: 'NombreArchivo', type: 'text', nullable: true })
  nombreArchivo: string;

  @Column({ name: 'Query', type: 'text', nullable: true })
  query: string;
}
