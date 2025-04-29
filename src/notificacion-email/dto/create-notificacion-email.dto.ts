import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificacionEmailDto {
  @IsString()
  @IsNotEmpty()
  Email: string;

  Enable: boolean;
}
